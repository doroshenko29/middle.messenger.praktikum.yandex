import Block from '../../blocks/block';
import AvatarChange from '../../component/avatarChange';
import BackLink from '../../component/backLink';
import Button from '../../component/button';
import FormField from '../../component/formField';
import PROFILE_PASSWORD_CHANGE_DTO from '../../constants/ProfilePasswordChangeDto';
import UserInfoController from '../../controllers/userInfoController';
import { IUserInfoDto } from '../../types/IUserInfoDto';
import getObjectFormData from '../../utils/getObjectFormData';
import needArray from '../../utils/needArray';
import Template from './profilePasswordChange.hbs?raw';
import connectToUser from '../../connectors/connectToUser';

class ProfilePasswordChangePage extends Block {
	protected get isFormValid() {
		return needArray(this.children.Fields as FormField[]).every(field => field.IsTouchedAndValid)
	}
	
	constructor() {
		super({
			Fields: PROFILE_PASSWORD_CHANGE_DTO.map(
				(field) => new FormField(field),
			),
			Avatar: new AvatarChange({
				value: '',
			}),
			Button: new Button({
				text: 'Сохранить',
			}),
			BackLink: new BackLink(),
			events: {
				submit: async (event) => {
					event.preventDefault();
					if(!this.isFormValid) {
						return;
					}
					await UserInfoController.UpdateUserPassword(getObjectFormData(new FormData(event.target as HTMLFormElement)));
				},
			},
		});
	}

	protected updateFields(info: IUserInfoDto) {
		this.setProps({name: info.display_name});
	}

	render() {
		return this.compile(Template, this.props);
	}
}

export default connectToUser(ProfilePasswordChangePage);
