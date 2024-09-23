import Block from '../../blocks/block';
import ButtonTemplate from './button.hbs?raw';

export default class ButtonBlock extends Block {
	constructor(props) {
		super('div', props);
	}

	render() {
		return this.compile(ButtonTemplate, { ...this.props });
	}
}
