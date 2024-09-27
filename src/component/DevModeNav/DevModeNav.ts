import { PAGE } from '../../App';
import Block from '../../blocks/block';
import NavLinkBlock from '../link/NavLink';
import Template from './DevModeNav.hbs?raw';

export default class DevModeNavBlock extends Block {
	constructor() {
		super({ classNames: ['dev-mode-nav'] }, 'nav');
	}

	render() {
		this.children = {
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
		};

		return this.compile(Template, { ...this.props });
	}
}
