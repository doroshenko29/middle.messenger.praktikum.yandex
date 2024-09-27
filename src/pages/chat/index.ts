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
		super({ classNames: ['page'] }, 'div');
	}

	render() {
		this.children = {
			linkToProfile: new LinkBlock({
				dataPage: PAGE.PROFILE,
				text: 'Профиль',
				classNames: ['link-to-profile'],
			}),
			chats: chats.map((field) => new ChatBlock(field)),
			currentChat: currentChat.map((el) => new MessageBlock(el)),
			messageInputField: new FormFieldBlock({
				classNames: ['message-field-wrapper'],
				name: 'message',
				type: 'text',
			}),
			buttonSubmit: new ButtonBlock({
				text: '>',
				classNames: ['button-send'],
			}),
			devModeNav: new DevModeNavBlock(),
		};

		return this.compile(Template, {});
	}
}
