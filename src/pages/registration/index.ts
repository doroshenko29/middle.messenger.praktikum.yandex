import { PAGE } from '../../App';
import Block from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import REGISTRATION_FIELDS_DTO from '../../constants/RegistrationFieldsDto';
import Template from './registration.hbs?raw';

export default class RegistrationPage extends Block {
	constructor() {
		super({
			LinkToAuthorize: new LinkBlock({
				dataPage: PAGE.LOGIN,
				text: 'Войти',
			}),
			ButtonSubmit: new ButtonBlock({
				text: 'Зарегистрироваться',
			}),
			Fields: REGISTRATION_FIELDS_DTO.map((field) => new FormFieldBlock(field)),
			DevModeNav: new DevModeNavBlock(),
		});
	}

	render() {
		return this.compile(Template, { title: 'Регистрация' });
	}
}
