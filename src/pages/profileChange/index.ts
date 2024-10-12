import Block from '../../blocks/block';
import AvatarChange from '../../component/avatarChange';
import BackLink from '../../component/backLink';
import Button from '../../component/button';
import DevModeNav from '../../component/devModeNav';
import FormField from '../../component/formField';
import PROFILE_FIELDS_DTO from '../../constants/ProfileFieldsDto';
import LogFormData from '../../utils/logFormData';
import Template from './profileChange.hbs?raw';

export default class ProfileChangePage extends Block {
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
		return this.compile(Template, this.props);
	}
}
