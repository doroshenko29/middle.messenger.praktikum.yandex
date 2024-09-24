import { PAGE } from '../../App';
import Block, { IBlockProps } from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import { mockRegistrationData } from '../../mocks';
import Template from './registration.hbs?raw';

export default class RegistrationPage extends Block<IRegistrationProps> {
	constructor() {
		super('div', { classNames: ['page'] });
	}

	render() {
		this.children = {
			linkToAuthorize: new LinkBlock({
				dataPage: PAGE.LOGIN,
				text: 'Войти',
			}),
			buttonSubmit: new ButtonBlock({
				text: 'Зарегистрироваться',
			}),
			fields: mockRegistrationData.fieldsDto.map(
				(field) => new FormFieldBlock(field),
			),
		};

		return this.compile(Template, { title: 'Регистрация' });
	}
}

export interface IRegistrationProps extends IBlockProps {
	title: string;
}
