import Block from '../../blocks/block';
import NeedArray from '../../utils/NeedArray';
import FormFieldTemplate from './form-field.hbs?raw';

export default class FormFieldBlock extends Block {
	constructor(props) {
		super('div', {
			...props,
			classNames: [...NeedArray(props.classNames), 'form-field'],
			events: {
				change: event => {
					event.preventDefault();
					this.setProps({
						value: event.target.value,
					});
				},
			},
		});
	}

	render() {
		return this.compile(FormFieldTemplate, { ...this.props });
	}
}
