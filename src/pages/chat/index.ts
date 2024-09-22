import Block from '../../blocks/block';
import { LinkBlock } from '../../component/link/Link';
import Template from './chat.hbs?raw';

export class ChatPage extends Block {
	constructor(props) {
		super('div', props);
	}

	render() {
		// this.children.linkToChat = new LinkBlock({
		// 	...this.props.linkToChat,
		// });

		return this.compile(Template, { ...this.props });
	}
}
