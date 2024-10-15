
import Block, { IBlockProps } from '../blocks/block';
import ChatsController, { IChatDto } from '../controllers/chatsController';
import Store, { StoreEvents } from '../store/store';
import isEqual from '../utils/isEqual';

export default function connectToCurrentChat(Component: new (_args?: unknown) => Block){
	return class extends Component {
		constructor(...args: IBlockProps[]) {
			let stateCurrentChatId: null | number = null;
			super(...(args as []));

			Store.on(StoreEvents.Updated, async () => {
				const newState = Store.getState<number & ReadonlyArray<IChatDto>>();
				const { currentChatId, chats = [], messages } = newState;
				const currentChat = chats.find(({id}) => id === currentChatId);
				this.setProps({
					chatId: currentChatId,
					title: currentChat?.title,
					messages,
				});

				if(!currentChatId) {
					return;
				}
				
				if (stateCurrentChatId && isEqual(stateCurrentChatId, currentChatId)) {
					return;
				}
				
				await ChatsController.ConnectToChat(currentChatId);

				stateCurrentChatId = newState.currentChatId;
			});
		}
	}
}
