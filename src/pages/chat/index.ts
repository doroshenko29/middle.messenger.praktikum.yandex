import Block from '../../blocks/block';
import ButtonBlock from '../../component/button';
import ChatBlock from '../../component/chat';
import DevModeNav from '../../component/dev';
import FormFieldBlock from '../../component/fo';
import Link from '../../component/link';
import MessageBlock from '../../component/message';
import PAGE from '../../constants/PAGE';
import { chats, currentChat } from '../../mocks';
import LogFormData from '../../utils/LogFormData';
import Template from './chat.hbs?raw';

export default class ChatPage extends Block {
	constructor() {
		super({
			LinkToProfile: new Link({
				dataPage: PAGE.PROFILE,
				text: 'Профиль',
				class: 'link-to-profile',
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
			DevModeNav: new DevModeNav(),
			events: {
				submit: (event) => {
					event.preventDefault();
					const formData = new FormData(event.target as HTMLFormElement);
					LogFormData(formData);
				},
			},
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}
