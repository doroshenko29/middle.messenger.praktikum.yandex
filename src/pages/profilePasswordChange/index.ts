import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/avatarChange';
import ButtonBlock from '../../component/button';
import DevModeNav from '../../component/devModeNav';
import FormFieldBlock from '../../component/formField';
import PROFILE_PASSWORD_CHANGE_DTO from '../../constants/ProfilePasswordChangeDto';
import LogFormData from '../../utils/logFormData';
import Template from './profilePasswordChange.hbs?raw';

export default class ProfilePasswordChangePage extends Block {
	constructor() {
		super({
			Fields: PROFILE_PASSWORD_CHANGE_DTO.map(
				(field) => new FormFieldBlock(field),
			),
			Avatar: new AvatarChangeBlock({
				value: '',
			}),
			Button: new ButtonBlock({
				text: 'Сохранить',
			}),
			DevModeNav: new DevModeNav(),
			events: {
				submit: (event) => {
					event.preventDefault();
					const formData = new FormData(event.target as HTMLFormElement);
					LogFormData(formData);
				},
			},
		});
	}

	render() {
		return this.compile(Template, { name: 'Иван' });
	}
}
