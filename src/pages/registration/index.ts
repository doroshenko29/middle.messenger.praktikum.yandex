import Block from '../../blocks/block';
import Button from '../../component/button';
import FormField from '../../component/formField';
import Link from '../../component/link';
import PAGE from '../../constants/PAGE';
import REGISTRATION_FIELDS_DTO from '../../constants/RegistrationFieldsDto';
import AuthController from '../../controllers/authController';
import GetObjectFormData from '../../utils/getObjectFormData';
import NeedArray from '../../utils/needArray';
import Template from './registration.hbs?raw';

export default class RegistrationPage extends Block {

	protected get isFormValid() {
		return NeedArray(this.children.Fields as FormField[]).every(field => field.IsTouchedAndValid)
	}

	constructor() {
		super({
			LinkToAuthorize: new Link({
				dataPage: PAGE.LOGIN,
				text: 'Войти',
			}),
			ButtonSubmit: new Button({
				text: 'Зарегистрироваться',
			}),
			Fields: REGISTRATION_FIELDS_DTO.map((field) => new FormField(field)),
			events: {
				submit: async (event) => {
					event.preventDefault();
					if(!this.isFormValid) {
						return;
					}
					await AuthController.SignUp(GetObjectFormData(new FormData(event.target as HTMLFormElement)));
				},
			},
		});
	}

	render() {
		return this.compile(Template, { title: 'Регистрация' });
	}
}
