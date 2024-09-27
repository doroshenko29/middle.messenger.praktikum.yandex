import Block, { IBlockProps } from '../../blocks/block';
import Template from './message.hbs?raw';

export default class MessageBlock extends Block<IMessageProps> {
	constructor(protected props: IMessageProps) {
		super(
			{
				...props,
				classNames: ['message', props.isMine ? 'mine' : null].filter(
					Boolean,
				) as string[],
			},
			'div',
		);
		const classNames = ['message'];
		if (this.props.isMine) {
			classNames.push('mine');
		}
		this.setProps({
			classNames: classNames,
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
