import Block, { IBlockProps } from '../../blocks/block';
import Template from './message.hbs?raw';

export default class MessageBlock extends Block {
	constructor(props: IMessageProps) {
		super({
			...props,
			class: props.isMine ? 'mine' : '',
		});
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export interface IMessageProps extends IBlockProps {
	text: string;
	isMine?: boolean;
}
