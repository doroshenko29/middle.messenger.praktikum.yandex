
import Block, { IBlockProps } from '../blocks/block';
import { IMessageProps } from '../component/message';
import UserInfoController from '../controllers/userInfoController';
import Store, { StoreEvents } from '../store/store';
import { IUserInfoDto } from '../types/IUserInfoDto';
import { INullable } from '../utils/INullable';

export default function connectToMessages(Component: new (_args?: unknown) => Block){
	return class extends Component {
		protected userInfo: INullable<IUserInfoDto> = null;

		constructor(...args: IBlockProps[]) {
			super(...(args as []));

			this.getUserInfo();

			Store.on(StoreEvents.Updated, () => {
				const { user, messages = [] } = Store.getState<IUserInfoDto & ReadonlyArray<IMessageProps>>();		
				this.userInfo = user;
				this.updateMessages(messages);
			});
		}

		protected async getUserInfo() {
			const info = await UserInfoController.GetUserInfo(false);	
			this.userInfo = info;
		}

		protected updateMessages(messages: ReadonlyArray<IMessageProps>) {
			if(!messages) {
				return;
			}
			this.setProps({messages})
		}
	}
}
