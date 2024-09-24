import { PAGE } from '../../App';
import Block, { IBlockProps } from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import { mockLoginData } from '../../mocks';
import Template from './login.hbs?raw';

export default class LoginPage extends Block<ILoginProps> {
	constructor() {
		super('div', { classNames: ['page'] });
	}

	render() {
		const fields = mockLoginData.fieldsDto.map(
			(field) =>
				new FormFieldBlock({
					...field,
				}),
		);
		this.children = {
			linkToRegistration: new LinkBlock({
				dataPage: PAGE.REGISTRATION,
				text: 'Нет аккаунта?',
			}),
			buttonSubmit: new ButtonBlock({
				text: 'Авторизоваться',
				events: {
					// Названия события точно такие же, как и у первого аргумента addEventListener:
					// click, mouseEnter, ...
					click: (event) => {
						event.preventDefault();
						fields.forEach((el) => console.log(el.getContent()));
					},
				},
			}),
			fields,
		};

		return this.compile(Template, { title: 'Вход' });
	}
}

export interface ILoginProps extends IBlockProps {
	title: string;
}
