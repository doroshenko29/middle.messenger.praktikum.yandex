
import Block, { IBlockProps } from '../blocks/block';
import { IChatDto } from '../controllers/chatsController';
import Store, { StoreEvents } from '../store/store';

export default function connectToCurrentChat(Component: new (_args?: unknown) => Block){
	return class extends Component {
		constructor(...args: IBlockProps[]) {
			super(...(args as []));

			Store.on(StoreEvents.Updated, () => {
				const { currentChatId, chats = [] } = Store.getState<number & ReadonlyArray<IChatDto>>();
				const currentChat = chats.find(({id}) => id === currentChatId);
				this.setProps({
					chatId: currentChatId,
					title: currentChat?.title,
				});
			});
		}

		
	}
}
