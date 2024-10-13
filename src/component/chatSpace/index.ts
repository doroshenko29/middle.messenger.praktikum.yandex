import Block, { IBlockProps } from '../../blocks/block';
import Button from '../../component/button';
import FormField from '../../component/formField';
import Message from '../../component/message';
import connectToCurrentChat from '../../connectors/connectToCurrentChat';
import { currentChat } from '../../mocks';
import LogFormData from '../../utils/logFormData';
import Template from './chatSpace.hbs?raw';
import ChatsController from "../../controllers/chatsController";
import Modal from '../modal';
import GetObjectFormData from '../../utils/getObjectFormData';
import NeedArray from '../../utils/needArray';

class ChatSpace extends Block {
	constructor(props: IChatSpaceProps = {}) {
		super({
            ...props,
            RemoveChat: new Button({
                class: 'small',
                text: 'X',
                events: {
					click: (event) => {
						event.preventDefault();
                        this.removeChat()
					},
				},
            }),
            AddUser: new Button({
                class: 'small',
                text: '+',
                events: {
					click: (event) => {
						event.preventDefault();
                        (this.children.ModalAddUser as Modal).show()
					},
				},
            }),
            ModalAddUser: new Modal({
				Title: "Добавить пользователя",
				Content: new FormField({
					class: 'form',
					label: 'Id',
					name: 'user_id',
					type: 'text',
				}),
				Submit: new Button({
					text: 'Добавить',
				}),
				OnSubmit: async (event) => {
					const isSuccess = await ChatsController.AddUserToChat(
						NeedArray(GetObjectFormData<{user_id: number[]}>(new FormData(event.target as HTMLFormElement)).user_id),
					);
					if(isSuccess) {
						(this.children.ModalAddUser as Modal).hide()
					}
				}
			}),
            RemoveUser: new Button({
                class: 'small',
                text: '-',
                events: {
					click: (event) => {
						event.preventDefault();
                        (this.children.ModalRemoveUser as Modal).show()
					},
				},
            }),
            ModalRemoveUser: new Modal({
				Title: "Удалить пользователя",
				Content: new FormField({
					class: 'form',
					label: 'Id',
					name: 'user_id',
					type: 'text',
				}),
				Submit: new Button({
					text: 'Удалить',
				}),
				OnSubmit: async (event) => {
					const isSuccess = await ChatsController.RemoveUserFromChat(
						NeedArray(GetObjectFormData<{user_id: number[]}>(new FormData(event.target as HTMLFormElement)).user_id),
					);
					if(isSuccess) {
						(this.children.ModalRemoveUser as Modal).hide()
					}
				}
			}),
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
			events: {
				submit: (event) => {
					event.preventDefault();
					const formData = new FormData(event.target as HTMLFormElement);
					LogFormData(formData);
				},
			},

			
		});
	}

    async removeChat() {
        await ChatsController.RemoveChat((this.props as IChatSpaceProps).chatId);
    }

	render() {
		return this.compile(Template, this.props);
	}
}

export default connectToCurrentChat(ChatSpace);

export interface IChatSpaceProps extends IBlockProps {
	chatId?: number;
}
