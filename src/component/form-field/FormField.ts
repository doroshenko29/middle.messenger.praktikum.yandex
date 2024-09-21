import Block from '../../blocks/block';
import FormFieldTemplate from './form-field.hbs?raw';

export class FormFieldBlock extends Block {
	constructor(props) {
		super('section', { ...props, classNames: ['form-field'] });
	}

	render() {
		return this.compile(FormFieldTemplate, { ...this.props });
	}
}
