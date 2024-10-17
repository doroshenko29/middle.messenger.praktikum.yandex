import Handlebars from 'handlebars';
import AuthForm from './partials/authForm.hbs?raw';
import PAGE from './constants/PAGE';
import ChatPage from './pages/chat';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import ProfileChangePage from './pages/profileChange';
import ProfilePasswordChangePage from './pages/profilePasswordChange';
import RegistrationPage from './pages/registration';
import Router from './router';

Handlebars.registerPartial('AuthForm', AuthForm);
export default class App {
	protected readonly appElement = document.getElementById('app')!;

	render() {
		new Router(this.appElement)
			.use(PAGE.LOGIN, LoginPage)
			.use(PAGE.REGISTRATION, RegistrationPage)
			.use(PAGE.CHAT, ChatPage)
			.use(PAGE.PROFILE, ProfilePage)
			.use(PAGE.PROFILE_CHANGE, ProfileChangePage)
			.use(PAGE.PROFILE_CHANGE_PASSWORD, ProfilePasswordChangePage)
			.start();
	}
}
