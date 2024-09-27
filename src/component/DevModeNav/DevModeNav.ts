import Block from '../../blocks/block';
import PAGE from '../../constants/PAGE';
import NavLinkBlock from '../Link/Link';
import Template from './DevModeNav.hbs?raw';

export default class DevModeNavBlock extends Block {
	constructor() {
		super({
			navigation: [
				new NavLinkBlock({
					dataPage: PAGE.LOGIN,
					text: 'Login',
				}),
				new NavLinkBlock({
					dataPage: PAGE.REGISTRATION,
					text: 'Registration',
				}),
				new NavLinkBlock({
					dataPage: PAGE.CHAT,
					text: 'Chat',
				}),
				new NavLinkBlock({
					dataPage: PAGE.PROFILE,
					text: 'Profile',
				}),
				new NavLinkBlock({
					dataPage: PAGE.PROFILE_CHANGE,
					text: 'Change user info',
				}),
				new NavLinkBlock({
					dataPage: PAGE.PROFILE_CHANGE_PASSWORD,
					text: 'Change password',
				}),
				new NavLinkBlock({
					dataPage: PAGE.ERROR,
					text: '5**',
				}),
				new NavLinkBlock({
					dataPage: PAGE.ERROR_NOT_FOUND,
					text: '404',
				}),
			],
		});
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}
