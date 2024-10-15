
import Block, { IBlockProps } from '../blocks/block';
import UserInfoController from '../controllers/userInfoController';
import Store, { StoreEvents } from '../store/store';
import { IUserInfoDto } from '../types/IUserInfoDto';
import NeedArray from '../utils/needArray';

export default function connectToUser(Component: new () => Block){
	return class extends Component {
		constructor(...args: IBlockProps[]) {
			super(...(args as []));

			this.getUserInfo();

			Store.on(StoreEvents.Updated, () => {
				const { user } = Store.getState<IUserInfoDto>();
				if(user == null) {
					return;
				}
				this.updateFields(user);
			});
		}

		protected async getUserInfo() {
			const info = await UserInfoController.GetUserInfo(false);
			if(info == null) {
				return;
			}
			this.updateFields(info);
		}

		/** переопределяемый метод */
		protected updateFields(info: IUserInfoDto) {
			try {
				super.updateFields(info);
			} catch (e) {
				for(const [key, value] of Object.entries(info)) {
					const field = NeedArray(this.children.Fields).find((el) => el.props.name === key)
					if(field) {
						(field!.children.Input as Block).setProps({value})
					}			
				}
			}
			if(info.avatar) {
				(this.children.Avatar as Block).setProps({value: info.avatar ? `https://ya-praktikum.tech/api/v2/resources/${info.avatar}` : '/image_placeholder.svg',});
			}
		}
	}
}
