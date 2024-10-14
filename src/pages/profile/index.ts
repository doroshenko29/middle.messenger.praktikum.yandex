import Block from '../../blocks/block';
import AvatarChange from '../../component/avatarChange';
import BackLink from '../../component/backLink';
import FormField from '../../component/formField';
import Link from '../../component/link';
import PROFILE_FIELDS_DTO from '../../constants/ProfileFieldsDto';
import PROFILE_LINKS_DTO from '../../constants/ProfileLinksDto';
import Template from './profile.hbs?raw';
import connectToUser from '../../connectors/connectToUser';

class ProfilePage extends Block {
	constructor() {
		super({
			Avatar: new AvatarChange({
				value: '',
			}),
			Fields: PROFILE_FIELDS_DTO.map((field) => new FormField(field)),
			FormLinks: PROFILE_LINKS_DTO.map((link) => new Link(link)),
			BackLink: new BackLink(),
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}

export default connectToUser(ProfilePage);
