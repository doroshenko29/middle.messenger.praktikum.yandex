import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/avatar-change/AvatarChange';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/form-field/FormField';
import PROFILE_PASSWORD_CHANGE_DTO from '../../constants/ProfilePasswordChangeDto';
import Template from './profile-password-change.hbs?raw';

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
			DevModeNav: new DevModeNavBlock(),
		});
	}

	render() {
		return this.compile(Template, { name: 'Иван' });
	}
}
