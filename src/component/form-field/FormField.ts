import Block, { IBlockProps } from '../../blocks/block';
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
					if (props.validatorCallback) {
						(this.children.ErrorMessage as Block).setProps({
							errorText: props.validatorCallback(value),
						});
					}
				},
			}),
			ErrorMessage: new ErrorBlock({}),
		});
	}

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
