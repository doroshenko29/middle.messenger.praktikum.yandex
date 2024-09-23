import Block, { IBlockProps } from '../../blocks/block';
import Template from './chat.hbs?raw';

export default class ChatBlock extends Block<IChatProps> {
	constructor(protected props: IChatProps) {
		super('div', props);
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export interface IChatProps extends IBlockProps {
	name: string;
	message: string;
	myMessage: boolean;
	time: string;
	unreadsCount: number;
}
