import Block from '../../blocks/block';
import Button from '../../component/button';
import FormField from '../../component/formField';
import Link from '../../component/link';
import LOGIN_FIELDS_DTO from '../../constants/LoginFieldsDto';
import PAGE from '../../constants/PAGE';
import AuthController from '../../controllers/authController';
import getObjectFormData from '../../utils/getObjectFormData';
import needArray from '../../utils/needArray';
import Template from './login.hbs?raw';

export default class LoginPage extends Block {
	protected get isFormValid() {
		return needArray(this.children.Fields as FormField[]).every(field => field.IsTouchedAndValid)
	}
	
	constructor() {
		super({
			LinkToRegistration: new Link({
				dataPage: PAGE.REGISTRATION,
				text: 'Нет аккаунта?',
			}),
			ButtonSubmit: new Button({
				text: 'Авторизоваться',
			}),
			Fields: LOGIN_FIELDS_DTO.map((field) => new FormField(field)),
			events: {
				submit: async (event) => {
					event.preventDefault();
					if(!this.isFormValid) {
						return;
					}
					await AuthController.SignIn(getObjectFormData(new FormData(event.target as HTMLFormElement)));
				},
			},
		});
	}

	render() {
		return this.compile(Template, { title: 'Вход' });
	}
}
