import Block, { IBlockProps } from '../../blocks/block';
import Template from './message.hbs?raw';
import Store from '../../store/store';
import { IUserInfoDto } from '../../types/IUserInfoDto';

export default class Message extends Block<IMessageProps> {
	constructor(props: IMessageProps) {
		const { user } = Store.getState<IUserInfoDto>();
		super({
			...props,
			class: props.user_id === user.id ? 'mine' : '',
		});
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export interface IMessageProps extends IBlockProps {
	content: string;
	chat_id: string;
	file: string;
	id: number;
	is_read: boolean;
	time: string;
	type: string;
	user_id: number;
}
