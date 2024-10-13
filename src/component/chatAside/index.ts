import Block, { IBlockProps } from '../../blocks/block';
import Button from '../../component/button';
import Chat from '../../component/chat';
import FormField from '../../component/formField';
import Link from '../../component/link';
import Modal from '../../component/modal';
import connectToChatAside from '../../connectors/connectToChatAside';
import PAGE from '../../constants/PAGE';
import ChatsController, { IChatDto } from '../../controllers/chatsController';
import GetObjectFormData from '../../utils/getObjectFormData';
import Template from './chatAside.hbs?raw';

function getChatsBlock(chats?: ReadonlyArray<IChatDto>) {
	if (!chats) {
		return [];
	}
	return chats.map((chat) => new Chat({
		...chat,
		onClick: () => {
			ChatsController.setCurrentChatId(chat.id);
		},
	}));
}

class ChatAside extends Block {
	constructor(props: IChatProps) {
		super({
			...props,
			LinkToProfile: new Link({
				dataPage: PAGE.PROFILE,
				text: 'Профиль',
				class: 'link-to-profile',
			}),
			ButtonAddChat: new Button({
				text: '+',
				class: 'small',
				events: {
					click: (event) => {
						event.preventDefault();
						(this.children.ModalAdd as Modal).show()
					},
				},
			}),
			ModalAdd: new Modal({
				Title: "Добавить чат",
				Content: new FormField({
					class: 'form',
					label: 'Название чата',
					name: 'title',
					type: 'text',
				}),
				Submit: new Button({
					text: 'Добавить',
				}),
				OnSubmit: async (event) => {
					const isSuccess = await ChatsController.CreateChat(
						GetObjectFormData(new FormData(event.target as HTMLFormElement))
					);
					if(isSuccess) {
						(this.children.ModalAdd as Modal).hide()
					}
				}
			}),
			Chats: [],
		});
	}

	protected componentDidUpdate(oldProps: IChatProps, newProps: IChatProps): boolean {
		this.children.Chats = getChatsBlock(newProps.chats)
		return super.componentDidUpdate(oldProps, newProps);
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export default connectToChatAside(ChatAside);

export interface IChatProps extends IBlockProps {
	chats?: ReadonlyArray<IChatDto>;
}
