import Block from '../../blocks/block';
import AvatarChange from '../../component/avatarChange';
import DevModeNav from '../../component/devModeNav';
import FormField from '../../component/formField';
import Link from '../../component/link';
import PROFILE_FIELDS_DTO from '../../constants/ProfileFieldsDto';
import PROFILE_LINKS_DTO from '../../constants/ProfileLinksDto';
import Template from './profile.hbs?raw';

export default class ProfilePage extends Block {
	constructor() {
		super({
			Avatar: new AvatarChange({
				value: '',
			}),
			Fields: PROFILE_FIELDS_DTO.map((field) => new FormField(field)),
			FormLinks: PROFILE_LINKS_DTO.map((link) => new Link(link)),
			DevModeNav: new DevModeNav(),
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}
