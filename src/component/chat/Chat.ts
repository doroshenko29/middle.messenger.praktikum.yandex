import Block, { IBlockProps } from '../../blocks/block';
import Template from './chat.hbs?raw';

export default class ChatBlock extends Block<IChatProps> {
	constructor(protected props: IChatProps) {
		super(props, 'div');
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export interface IChatProps extends IBlockProps {
	id: string;
	name: string;
	message?: string;
	myMessage?: boolean;
	time?: string;
	unreadsCount?: number;
}
