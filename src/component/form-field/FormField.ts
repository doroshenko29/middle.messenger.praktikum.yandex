import Block, { IBlockProps } from '../../blocks/block';
import NeedArray from '../../utils/NeedArray';
import FormFieldTemplate from './form-field.hbs?raw';

export default class FormFieldBlock extends Block<IFormFieldProps> {
	constructor(protected props: IFormFieldProps) {
		super('div', {
			...props,
			classNames: [...NeedArray(props.classNames!), 'form-field'],
			events: {
				change: (event) => {
					event.preventDefault();
					this.setProps({
						value: event.target?.value,
					});
				},
			},
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
}
