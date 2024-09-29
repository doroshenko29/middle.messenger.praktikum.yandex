import Block, { IBlockProps } from '../../blocks/block';
import Template from './chat.hbs?raw';

export default class Chat extends Block<IChatProps> {
	render() {
		return this.compile(Template, { ...this.props });
	}
}

interface IChatProps extends IBlockProps {
	id: string,
	name: string,
	message?: string,
	time?: string,
	unreadsCount?: number,
	myMessage?: boolean,
}
