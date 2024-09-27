import Block, { IBlockProps } from '../../blocks/block';
import NeedArray from '../../utils/NeedArray';
import InputBlock from '../Input/Input';
import LabelBlock from '../Label/Label';
import FormFieldTemplate from './form-field.hbs?raw';

export default class FormFieldBlock extends Block<IFormFieldProps> {
	constructor(protected props: IFormFieldProps) {
		super({
			...props,
			classNames: [...NeedArray(props.classNames!), 'form-field'],
			Label: new LabelBlock({
				...props,
			}),
			Input: new InputBlock({
				...props,
				OnBlur: (e) => {
					console.log(e)
				}
			})
			// events: {
			// 	change: (event) => {
			// 		event.preventDefault();
			// 		this.setProps({
			// 			value: (event.target as HTMLInputElement).value,
			// 		});
			// 	},
			// },
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
