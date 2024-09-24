import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/avatar-change/AvatarChange';
import ButtonBlock from '../../component/button/Button';
import FormFieldBlock from '../../component/form-field/FormField';
import { mockProfileData } from '../../mocks';
import Template from './profile-change.hbs?raw';

export default class ProfileChangePage extends Block {
	constructor() {
		super('div', { classNames: ['page'] });
	}

	render() {
		this.children = {
			fields: mockProfileData.fieldsDto.map(
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
