import Block from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/FormField/FormField';
import Link from '../../component/link';
import PAGE from '../../constants/PAGE';
import REGISTRATION_FIELDS_DTO from '../../constants/RegistrationFieldsDto';
import LogFormData from '../../utils/LogFormData';
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
		return this.compile(Template, { title: 'Регистрация' });
	}
}
