import Block from '../../blocks/block';
import ButtonBlock from '../../component/button';
import DevModeNav from '../../component/devModeNav';
import FormFieldBlock from '../../component/formField';
import Link from '../../component/link';
import LOGIN_FIELDS_DTO from '../../constants/LoginFieldsDto';
import PAGE from '../../constants/PAGE';
import LogFormData from '../../utils/logFormData';
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
			DevModeNav: new DevModeNav(),
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
