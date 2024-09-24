import { PAGE } from '../../App';
import Block from '../../blocks/block';
import AvatarChangeBlock from '../../component/avatar-change/AvatarChange';
import FormFieldBlock from '../../component/form-field/FormField';
import LinkBlock from '../../component/link/Link';
import { mockProfileData } from '../../mocks';
import Template from './profile.hbs?raw';

export default class ProfilePage extends Block {
	constructor() {
		super('div', { classNames: ['page'] });
	}

	render() {
		this.children = {
			fields: mockProfileData.fieldsDto.map(
				(field) => new FormFieldBlock(field),
			),
			formLinks: [
				new LinkBlock({
					dataPage: PAGE.PROFILE_CHANGE,
					text: 'Изменить данные',
				}),
				new LinkBlock({
					dataPage: PAGE.PROFILE_CHANGE_PASSWORD,
					text: 'Изменить пароль',
				}),
				new LinkBlock({
					dataPage: PAGE.LOGIN,
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
