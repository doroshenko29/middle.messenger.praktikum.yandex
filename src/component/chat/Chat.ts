import Block from '../../blocks/block';
import Template from './chat.hbs?raw';

export default class ChatBlock extends Block {
	constructor(props) {
		super('div', props);
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}
