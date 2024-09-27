import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/avatar-change/AvatarChange';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/form-field/FormField';
import PROFILE_FIELDS_DTO from '../../constants/ProfileFieldsDto';
import Template from './profile-change.hbs?raw';

export default class ProfileChangePage extends Block {
	constructor() {
		super({
			Fields: PROFILE_FIELDS_DTO.map((field) => new FormFieldBlock(field)),
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
		return this.compile(Template, this.props);
	}
}
