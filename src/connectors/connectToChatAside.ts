
import Block, { IBlockProps } from '../blocks/block';
import ChatsController, { IChatDto } from '../controllers/chatsController';
import UserInfoController from '../controllers/userInfoController';
import Store, { StoreEvents } from '../store/store';
import { IUserInfoDto } from '../types/IUserInfoDto';
import { INullable } from '../utils/INullable';

export default function connectToChatAside(Component: new (_args?: unknown) => Block){
	return class extends Component {
		protected userInfo: INullable<IUserInfoDto> = null;

		constructor(...args: IBlockProps[]) {
			super(...(args as []));

			this.getUserInfo();
			this.getChats();

			Store.on(StoreEvents.Updated, () => {
				const { user, chats } = Store.getState<IUserInfoDto & ReadonlyArray<IChatDto>>();		
				this.userInfo = user;
				this.updateChats(chats);
			});
		}

		protected async getUserInfo() {
			const info = await UserInfoController.GetUserInfo(false);	
			this.userInfo = info;
		}

		protected async getChats() {
			const chats = await ChatsController.GetChats({}, false);	
			if(chats == null) {
				return;
			}
			this.updateChats(chats)
		}

		protected updateChats(chats: ReadonlyArray<IChatDto>) {
			if(!chats) {
				return;
			}
			this.setProps({chats})
		}
	}
}
