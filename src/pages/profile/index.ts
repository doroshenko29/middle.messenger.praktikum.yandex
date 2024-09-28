import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/AvatarChange/AvatarChange';
import DevModeNav from '../../component/devModeNav';
import FormFieldBlock from '../../component/FormField/FormField';
import Link from '../../component/link';
import PROFILE_FIELDS_DTO from '../../constants/ProfileFieldsDto';
import PROFILE_LINKS_DTO from '../../constants/ProfileLinksDto';
import Template from './profile.hbs?raw';

export default class ProfilePage extends Block {
	constructor() {
		super({
			Avatar: new AvatarChangeBlock({
				value: '',
			}),
			Fields: PROFILE_FIELDS_DTO.map((field) => new FormFieldBlock(field)),
			FormLinks: PROFILE_LINKS_DTO.map((link) => new Link(link)),
			DevModeNav: new DevModeNav(),
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}
