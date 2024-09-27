import Block, { IBlockProps } from '../../blocks/block';
import VALIDATOR from '../../constants/Validator';
import ErrorBlock from '../Error/Error';
import InputBlock from '../Input/Input';
import LabelBlock from '../Label/Label';
import FormFieldTemplate from './form-field.hbs?raw';

export default class FormFieldBlock extends Block {
	constructor(props: IFormFieldProps) {
		super({
			...props,
			Label: new LabelBlock({
				...props,
			}),
			Input: new InputBlock({
				...props,
				OnBlur: (value) => {
					(this.children.ErrorMessage as Block).setProps({
						errorText: this.validatorCallback(VALIDATOR[props.name], value),
					});
				},
			}),
			ErrorMessage: new ErrorBlock({}),
		});
	}

	validatorCallback = (validator: RegExp, value: string | number) => {
		if (!value) {
			return 'Поле не должно быть пустым';
		}
		const isValid = new RegExp(validator).test(value.toString());
		if (isValid) {
			return null;
		}
		return `Поле "${this.props.label}" содержит недопустимые символы`;
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
	validatorCallback?: (value?: string | number) => string | null;
}
