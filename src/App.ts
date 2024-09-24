import Handlebars from 'handlebars';
import * as Pages from './pages';
import BackLink from './partials/back-link.hbs?raw';
import AuthForm from './partials/auth-form.hbs?raw';
import DevModeNav from './partials/dev-mode-nav.hbs?raw';
import Link from './partials/link.hbs?raw';
import Block from './blocks/block';

Handlebars.registerPartial('BackLink', BackLink);
Handlebars.registerPartial('AuthForm', AuthForm);
Handlebars.registerPartial('DevModeNav', DevModeNav);
Handlebars.registerPartial('Link', Link);

function renderBlock(root: HTMLElement, block: Block) {
	root.appendChild(block.getContent()!);
	block.dispatchComponentDidMount();
	return root;
}

export default class App {
	protected state: IAppState = {
		currentPage: PAGE.CHAT,
	};

	protected readonly appElement = document.getElementById('app')!;

	render() {
		const page: Block = (() => {
			switch (this.state.currentPage) {
				case PAGE.LOGIN: {
					return new Pages.LoginPage();
				}
				case PAGE.REGISTRATION: {
					return new Pages.RegistrationPage();
				}
				case PAGE.CHAT: {
					return new Pages.ChatPage();
				}
				case PAGE.PROFILE: {
					return new Pages.ProfilePage();
				}
				case PAGE.PROFILE_CHANGE: {
					return new Pages.ProfileChangePage();
				}
				case PAGE.PROFILE_CHANGE_PASSWORD: {
					return new Pages.ProfilePasswordChangePage();
				}
				case PAGE.ERROR: {
					return new Pages.ErrorPage({
						errorCode: '500',
						errorText: 'Мы уже фиксим',
					});
				}
				case PAGE.ERROR_NOT_FOUND:
				default: {
					return new Pages.ErrorPage({
						errorCode: '404',
						errorText: 'Не туда попали',
					});
				}
			}
		})();

		this.appElement.innerHTML = '';
		renderBlock(this.appElement, page);

		this.attachEventListeners();
	}

	attachEventListeners() {
		const footerLinks = document.querySelectorAll('a');
		footerLinks.forEach((link) => {
			link.addEventListener('click', (e: Event) => {
				e.preventDefault();
				this.changePage((e.target as HTMLElement).dataset.page as PAGE);
			});
		});
	}

	changePage(page: PAGE) {
		this.state.currentPage = page;
		this.render();
	}
}

interface IAppState {
	currentPage: PAGE | keyof typeof PAGE;
}

export enum PAGE {
	LOGIN = 'login',
	REGISTRATION = 'registration',
	CHAT = 'chat',
	PROFILE = 'profile',
	PROFILE_CHANGE = 'profile-change',
	PROFILE_CHANGE_PASSWORD = 'profile-password-change',
	ERROR = 'error-5**',
	ERROR_NOT_FOUND = 'error-404',
}
