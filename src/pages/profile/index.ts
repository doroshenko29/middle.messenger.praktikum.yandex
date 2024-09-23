import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/avatar-change/AvatarChange';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import Template from './profile.hbs?raw';

export default class ProfilePage extends Block {
	constructor(props) {
		super('div', { ...props, classNames: ['page'] });
	}

	render() {
		this.children = {
			fields: this.props.fieldsDto.map((field) => new FormFieldBlock(field)),
			formLinks: [
				new LinkBlock({
					dataPage: 'profile-change',
					text: 'Изменить данные',
				}),
				new LinkBlock({
					dataPage: 'profile-password-change',
					text: 'Изменить пароль',
				}),
				new LinkBlock({
					dataPage: 'login',
					text: 'Выйти',
					extraClass: ' exit-link',
				}),
			],
			avatar: new AvatarChangeBlock({
				value: '',
			}),
		};

		return this.compile(Template, { ...this.props });
	}
}
