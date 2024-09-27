import Block from '../../blocks/block';
import Template from './chat.hbs?raw';

export default class ChatBlock extends Block {
	render() {
		return this.compile(Template, { ...this.props });
	}
}
