import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/avatar-change/AvatarChange';
import ButtonBlock from '../../component/button/Button';
import FormFieldBlock from '../../component/form-field/FormField';
import Template from './profile-password-change.hbs?raw';

export default class ProfilePasswordChangePage extends Block {
	constructor(props) {
		super('div', { ...props, classNames: ['page'] });
	}

	render() {
		this.children = {
			fields: this.props.password_fields.map(
				(field) => new FormFieldBlock(field),
			),
			avatar: new AvatarChangeBlock({
				value: '',
			}),
			button: new ButtonBlock({
				text: 'Сохранить',
			}),
		};

		return this.compile(Template, { ...this.props });
	}
}
