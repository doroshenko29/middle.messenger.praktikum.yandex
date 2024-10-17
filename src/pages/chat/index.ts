import Block from '../../blocks/block';
import Template from './chat.hbs?raw';
import ChatAside from '../../component/chatAside';
import ChatSpace from '../../component/chatSpace';

class ChatPage extends Block {
	constructor() {
		super({
			ChatAside: new ChatAside(),
			ChatSpace: new ChatSpace(),
		});
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export default ChatPage;
