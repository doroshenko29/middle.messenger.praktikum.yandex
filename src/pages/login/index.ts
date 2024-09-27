import Block from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import LOGIN_FIELDS_DTO from '../../constants/LoginFieldsDto';
import PAGE from '../../constants/PAGE';
import Template from './login.hbs?raw';

export default class LoginPage extends Block {
	constructor() {
		super({
			LinkToRegistration: new LinkBlock({
				dataPage: PAGE.REGISTRATION,
				text: 'Нет аккаунта?',
			}),
			ButtonSubmit: new ButtonBlock({
				text: 'Авторизоваться',
			}),
			Fields: LOGIN_FIELDS_DTO.map((field) => new FormFieldBlock(field)),
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
