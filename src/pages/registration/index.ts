import Block from '../../blocks/block';
import ButtonBlock from '../../component/button';
import DevModeNav from '../../component/devModeNav';
import FormFieldBlock from '../../component/formField';
import Link from '../../component/link';
import PAGE from '../../constants/PAGE';
import REGISTRATION_FIELDS_DTO from '../../constants/RegistrationFieldsDto';
import LogFormData from '../../utils/logFormData';
import Template from './registration.hbs?raw';

export default class RegistrationPage extends Block {
	constructor() {
		super({
			LinkToAuthorize: new Link({
				dataPage: PAGE.LOGIN,
				text: 'Войти',
			}),
			ButtonSubmit: new ButtonBlock({
				text: 'Зарегистрироваться',
			}),
			Fields: REGISTRATION_FIELDS_DTO.map((field) => new FormFieldBlock(field)),
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
		return this.compile(Template, { title: 'Регистрация' });
	}
}
