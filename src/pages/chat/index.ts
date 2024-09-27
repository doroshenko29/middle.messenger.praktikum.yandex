import { PAGE } from '../../App';
import Block from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import ChatBlock from '../../component/chat/Chat';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import MessageBlock from '../../component/message/Message';
import { chats, currentChat } from '../../mocks';
import Template from './chat.hbs?raw';

export default class ChatPage extends Block {
	constructor() {
		super({
			LinkToProfile: new LinkBlock({
				dataPage: PAGE.PROFILE,
				text: 'Профиль',
				classNames: ['link-to-profile'],
			}),
			Chats: chats.map((field) => new ChatBlock(field)),
			CurrentChat: currentChat.map((el) => new MessageBlock(el)),
			MessageInputField: new FormFieldBlock({
				class: 'message-field-wrapper',
				name: 'message',
				type: 'text',
			}),
			ButtonSubmit: new ButtonBlock({
				text: '>',
				class: 'button-send',
			}),
			DevModeNav: new DevModeNavBlock(),
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}
