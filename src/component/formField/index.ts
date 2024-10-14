import Block, { IBlockProps } from '../../blocks/block';
import ERROR_TEXT from '../../constants/ERROR_TEXT';
import VALIDATOR from '../../constants/Validator';
import Error from '../error';
import Input from '../input';
import Label from '../label';
import FormFieldTemplate from './formField.hbs?raw';

export default class FormField extends Block<IFormFieldProps> {
	protected isTouched = false;
	
	public IsValid = true;

	public get IsTouchedAndValid() {
		return this.isTouched && this.IsValid;
	}

	constructor(props: IFormFieldProps) {
		super({
			...props,
			Label: new Label({
				...props,
			}),
			Input: new Input({
				...props,
				OnBlur: (value) => {
					this.isTouched = true;
					const errorText = this.validatorCallback(VALIDATOR[props.name], value, ERROR_TEXT[props.name]);
					this.IsValid = errorText == null;
					(this.children.ErrorMessage as Error).setProps({
						errorText,
					});
				},
			}),
			ErrorMessage: new Error({}),
		});
	}

	clean() {
		(this.children.Input as Block).setProps({value: ""});
		this.IsValid = true;
		this.isTouched = false;
	}

	validatorCallback = (validator: RegExp, value: string | number, textError: string) => {
		if (!value) {
			return 'Поле не должно быть пустым';
		}
		const isValid = new RegExp(validator).test(value.toString());
		if (isValid) {
			return null;
		}
		return `Поле "${this.props.label}" должно содержать ${textError}`;
	};

	render() {
		return this.compile(FormFieldTemplate, { ...this.props });
	}
}

export interface IFormFieldProps extends IBlockProps {
	label?: string;
	name: string;
	type: string;
	value?: string | number;
	class?: string;
	validatorCallback?: (value?: string | number) => string | null;
}
