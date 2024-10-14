import Block from '../../blocks/block';
import AvatarChange from '../../component/avatarChange';
import BackLink from '../../component/backLink';
import Button from '../../component/button';
import FormField from '../../component/formField';
import PROFILE_FIELDS_DTO from '../../constants/ProfileFieldsDto';
import Template from './profileChange.hbs?raw';
import UserInfoController from '../../controllers/userInfoController';
import NeedArray from '../../utils/needArray';
import GetObjectFormData from '../../utils/getObjectFormData';
import connectToUser from '../../connectors/connectToUser';

class ProfileChangePage extends Block {
	protected get isFormValid() {
		return NeedArray(this.children.Fields as FormField[]).every(field => field.IsValid)
	}

	constructor() {
		super({
			Fields: PROFILE_FIELDS_DTO.map((field) => new FormField(field)),
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
					await UserInfoController.UpdateUserInfo(GetObjectFormData(new FormData(event.target as HTMLFormElement)));
				},
			},
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}

export default connectToUser(ProfileChangePage);
