import Handlebars from 'handlebars';
import BackLink from './partials/back-link.hbs?raw';
import AuthForm from './partials/auth-form.hbs?raw';
import Block from './blocks/block';
import PAGE from './constants/PAGE';
import ChatPage from './pages/chat';
import ErrorPage from './pages/error';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import ProfileChangePage from './pages/profileChange';
import ProfilePasswordChangePage from './pages/profilePasswordChange';
import RegistrationPage from './pages/registration';

Handlebars.registerPartial('BackLink', BackLink);
Handlebars.registerPartial('AuthForm', AuthForm);

function renderBlock(root: HTMLElement, block: Block) {
	root.appendChild(block.getContent()!);
	block.dispatchComponentDidMount();
	return root;
}

export default class App {
	protected state: IAppState = {
		currentPage: PAGE.LOGIN,
	};

	protected readonly appElement = document.getElementById('app')!;

	render() {
		const page: Block = (() => {
			switch (this.state.currentPage) {
				case PAGE.LOGIN: {
					return new LoginPage();
				}
				case PAGE.REGISTRATION: {
					return new RegistrationPage();
				}
				case PAGE.CHAT: {
					return new ChatPage();
				}
				case PAGE.PROFILE: {
					return new ProfilePage();
				}
				case PAGE.PROFILE_CHANGE: {
					return new ProfileChangePage();
				}
				case PAGE.PROFILE_CHANGE_PASSWORD: {
					return new ProfilePasswordChangePage();
				}
				case PAGE.ERROR: {
					return new ErrorPage({
						errorCode: '500',
						errorText: 'Мы уже фиксим',
					});
				}
				case PAGE.ERROR_NOT_FOUND:
				default: {
					return new ErrorPage({
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
