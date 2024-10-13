import Block from '../../blocks/block';
import DevModeNav from '../../component/devModeNav';
import Template from './chat.hbs?raw';
import ChatAside from '../../component/chatAside';
import ChatSpace from '../../component/chatSpace';

class ChatPage extends Block {
	constructor() {
		super({
			ChatAside: new ChatAside(),
			ChatSpace: new ChatSpace(),
			DevModeNav: new DevModeNav(),
		});
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export default ChatPage;
