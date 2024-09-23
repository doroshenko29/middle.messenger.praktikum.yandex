import Block from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import ChatBlock from '../../component/chat/Chat';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import MessageBlock from '../../component/message/Message';
import Template from './chat.hbs?raw';

export default class ChatPage extends Block {
	constructor(props) {
		super('div', { ...props, classNames: ['page'] });
	}

	render() {
		this.children = {
			linkToProfile: new LinkBlock({
				dataPage: 'profile',
				text: 'Профиль',
				classNames: ['link-to-profile'],
			}),
			chats: this.props.chats.map((field) => new ChatBlock(field)),
			currentChat: this.props.currentChat.map((el) => new MessageBlock(el)),
			messageInputField: new FormFieldBlock({
				classNames: ['message-field-wrapper'],
				name: 'message',
				type: 'text',
			}),
			buttonSubmit: new ButtonBlock({
				text: '>',
				classNames: ['button-send'],
			}),
		};

		return this.compile(Template, { ...this.props });
	}
}
