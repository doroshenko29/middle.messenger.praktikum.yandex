import Block, { IBlockProps } from '../../blocks/block';
import Button from '../button';
import FormField from '../formField';
import Modal from '../modal';
import Template from './avatarChange.hbs?raw';
import UserInfoController from '../../controllers/userInfoController';

export default class AvatarChange extends Block<IAvatarChangeProps> {
	constructor(props: IAvatarChangeProps) {
		super({
			...props,
			ModalUploadImage: new Modal({
				Title: "Загрузите файл",
				Content: new FormField({
					class: 'form',
					label: 'Выбрать файл на компьютере',
					name: 'avatar',
					type: 'file',
				}),
				Submit: new Button({
					text: 'Изменить',
				}),
				OnSubmit: async (event) => {
					await UserInfoController.UpdateProfileAvatar(new FormData(event.target as HTMLFormElement));
					(this.children.ModalUploadImage as Modal).hide()
				}
			}),
			events: {
				click: (event) => {
					event.preventDefault();
					(this.children.ModalUploadImage as Modal).show()
				}
			}
		})
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

interface IAvatarChangeProps extends IBlockProps {
	value: string;
}
