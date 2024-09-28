import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/AvatarChange/AvatarChange';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/FormField/FormField';
import PROFILE_FIELDS_DTO from '../../constants/ProfileFieldsDto';
import LogFormData from '../../utils/LogFormData';
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
		return this.compile(Template, this.props);
	}
}
