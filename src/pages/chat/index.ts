import Block from '../../blocks/block';
import Button from '../../component/button';
import Chat from '../../component/chat';
import DevModeNav from '../../component/devModeNav';
import FormField from '../../component/formField';
import Link from '../../component/link';
import Message from '../../component/message';
import PAGE from '../../constants/PAGE';
import { chats, currentChat } from '../../mocks';
import LogFormData from '../../utils/logFormData';
import Template from './chat.hbs?raw';

export default class ChatPage extends Block {
	constructor() {
		super({
			LinkToProfile: new Link({
				dataPage: PAGE.PROFILE,
				text: 'Профиль',
				class: 'link-to-profile',
			}),
			Chats: chats.map((field) => new Chat(field)),
			CurrentChat: currentChat.map((el) => new Message(el)),
			MessageInputField: new FormField({
				class: 'message-field-wrapper',
				name: 'message',
				type: 'text',
			}),
			ButtonSubmit: new Button({
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
