import Block from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/FormField/FormField';
import Link from '../../component/Link/Link';
import LOGIN_FIELDS_DTO from '../../constants/LoginFieldsDto';
import PAGE from '../../constants/PAGE';
import LogFormData from '../../utils/LogFormData';
import Template from './login.hbs?raw';

export default class LoginPage extends Block {
	constructor() {
		super({
			LinkToRegistration: new Link({
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
					LogFormData(formData);
				},
			},
		});
	}

	render() {
		return this.compile(Template, { title: 'Вход' });
	}
}
