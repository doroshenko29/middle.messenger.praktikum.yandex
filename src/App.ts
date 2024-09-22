import Handlebars from 'handlebars';
import * as Pages from './pages';
import { mockLoginData, mockRegistrationData, mockProfileData } from './mocks';
/* Register partials */
import BackLink from './partials/back-link.hbs?raw';
import AuthForm from './partials/auth-form.hbs?raw';
import DevModeNav from './partials/dev-mode-nav.hbs?raw';
import Link from './partials/link.hbs?raw';
// import { ButtonBlock } from "./component/button/Button";

Handlebars.registerPartial('BackLink', BackLink);
Handlebars.registerPartial('AuthForm', AuthForm);
Handlebars.registerPartial('DevModeNav', DevModeNav);
Handlebars.registerPartial('Link', Link);

function renderBlock(root, block) {
	root.appendChild(block.getContent());
	block.dispatchComponentDidMount();
	return root;
}

export default class App {
  protected state: IAppState = {
    currentPage: PAGE.LOGIN,
  }
  protected readonly appElement = document.getElementById('app')!;

	render() {
		const page = (() => {
			switch (this.state.currentPage) {
				case PAGE.LOGIN: {
					return new Pages.LoginPage(mockLoginData);
				}
				case PAGE.REGISTRATION: {
					return new Pages.RegistrationPage(mockRegistrationData);
				}
        case PAGE.CHAT: {
          return new Pages.ChatPage({
            messages: [
              {
                id: '1',
                name: 'vasya',
              },
            ],
            message: {
              '1': [
                {
                  text: 'lya'
                },
              ],
            },
          });
        }
				case PAGE.PROFILE: {
					return new Pages.ProfilePage(mockProfileData);
				}
				case PAGE.PROFILE_CHANGE: {
					return new Pages.ProfileChangePage(mockProfileData);
				}
				case PAGE.PROFILE_CHANGE_PASSWORD: {
					return new Pages.ProfilePasswordChangePage(mockProfileData);
				}
				case PAGE.ERROR: {
					return new Pages.ErrorPage({
						errorCode: '500',
						errorText: 'Мы уже фиксим',
						linkToChat: {
							dataPage: 'chat',
							text: 'Назад к чатам',
						},
					});
				}
				case PAGE.ERROR_NOT_FOUND:
				default: {
					return new Pages.ErrorPage({
						errorCode: '404',
						errorText: 'Не туда попали',
						linkToChat: {
							dataPage: 'chat',
							text: 'Назад к чатам',
						},
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
				this.changePage(e.target?.dataset.page);
			});
		});
	}

	changePage(page) {
		this.state.currentPage = page;
		this.render();
	}
}

interface IAppState {
  currentPage: PAGE | keyof typeof PAGE;
}

export enum PAGE {
  LOGIN = "login",
  REGISTRATION = "registration",
  CHAT = "chat",
  PROFILE = "profile",
  PROFILE_CHANGE = "profile-change",
  PROFILE_CHANGE_PASSWORD = "profile-password-change",
  ERROR = "error-5**",
  ERROR_NOT_FOUND = "error-404",
};
