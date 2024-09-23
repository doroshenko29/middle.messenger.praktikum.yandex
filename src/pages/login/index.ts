import Block from '../../blocks/block';
import ButtonBlock from '../../component/button/Button';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import Template from './login.hbs?raw';

export default class LoginPage extends Block {
	constructor(props) {
		super('div', { ...props, classNames: ['page'] });
	}

	render() {
		const fields = this.props.fieldsDto.map(
			(field) =>
				new FormFieldBlock({
					...field,
				}),
		);
		this.children = {
			linkToRegistration: new LinkBlock({
				dataPage: 'registration',
				text: 'Нет аккаунта?',
			}),
			buttonSubmit: new ButtonBlock({
				text: 'Авторизоваться',
				events: {
					// Названия события точно такие же, как и у первого аргумента addEventListener:
					// click, mouseEnter, ...
					click: (event) => {
						event.preventDefault();
						fields.forEach((el) => console.log(el.props.value));
					},
				},
			}),
			fields,
		};

		return this.compile(Template, { ...this.props });
	}
}
