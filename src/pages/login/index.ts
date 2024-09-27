import { PAGE } from '../../App';
import Block from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import Template from './login.hbs?raw';

export default class LoginPage extends Block {
	constructor() {
		super({
			classNames: ['page'],
			LinkToRegistration: new LinkBlock({
				dataPage: PAGE.REGISTRATION,
				text: 'Нет аккаунта?',
			}),
			ButtonSubmit: new ButtonBlock({
				text: 'Авторизоваться',
			}),
			Login: new FormFieldBlock({
				label: 'Логин',
				name: 'login',
				type: 'text',
				validatorCallback: (value) => {
					if(value!.toString().includes('doro')) {
						return 'NO DORO'
					}
					return null;
				}
			}),
			Password: new FormFieldBlock({
				label: 'Пароль',
				name: 'password',
				type: 'password',
				validatorCallback: (value) => {
					if(value!.toString().includes('123')) {
						return 'NO NO NO KEK'
					}
					return null;
				}
			}),
			DevModeNav: new DevModeNavBlock(),
			events: {
				submit: (event) => {
					event.preventDefault();
					const formData = new FormData(event.target as HTMLFormElement);
					// работает. Далее по ТЗ
					console.log(formData.get('login'));
				},
			},
		});
	}

	render() {
		return this.compile(Template, { title: 'Вход' });
	}
}
