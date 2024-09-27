import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/avatar-change/AvatarChange';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
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
			FormLinks: PROFILE_LINKS_DTO.map((link) => new LinkBlock(link)),
			DevModeNav: new DevModeNavBlock(),
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}
