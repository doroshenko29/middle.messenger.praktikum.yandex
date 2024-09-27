import { PAGE } from '../../App';
import Block, { IBlockProps } from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import { mockLoginData } from '../../mocks';
import Template from './login.hbs?raw';

export default class LoginPage extends Block<ILoginProps> {
	constructor() {
		super(
			{
				classNames: ['page'],
				linkToRegistration: new LinkBlock({
					dataPage: PAGE.REGISTRATION,
					text: 'Нет аккаунта?',
				}),
				buttonSubmit: new ButtonBlock({
					text: 'Авторизоваться',
				}),
				fields: new FormFieldBlock({
					label: 'Логин',
					name: 'login',
					type: 'text',
				}),
				devModeNav: new DevModeNavBlock(),
				events: {
					submit: (event) => {
						event.preventDefault();
						const formData = new FormData(event.target as HTMLFormElement);
						// работает. Далее по ТЗ
						console.log(formData.get('login'));
						this.children.fields.setProps({
							errorText: formData.get('login'),
						}); 
					},
				},
			},
			'div',
		);
	}

	render() {
		return this.compile(Template, { title: 'Вход' });
	}
}

export interface ILoginProps extends IBlockProps {
	title: string;
}
