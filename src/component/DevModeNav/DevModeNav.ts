import Block from '../../blocks/block';
import PAGE from '../../constants/PAGE';
import Link from '../Link';
import Template from './DevModeNav.hbs?raw';

export default class DevModeNavBlock extends Block {
	constructor() {
		super({
			navigation: [
				new Link({
					dataPage: PAGE.LOGIN,
					text: 'Login',
				}),
				new Link({
					dataPage: PAGE.REGISTRATION,
					text: 'Registration',
				}),
				new Link({
					dataPage: PAGE.CHAT,
					text: 'Chat',
				}),
				new Link({
					dataPage: PAGE.PROFILE,
					text: 'Profile',
				}),
				new Link({
					dataPage: PAGE.PROFILE_CHANGE,
					text: 'Change user info',
				}),
				new Link({
					dataPage: PAGE.PROFILE_CHANGE_PASSWORD,
					text: 'Change password',
				}),
				new Link({
					dataPage: PAGE.ERROR,
					text: '5**',
				}),
				new Link({
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
