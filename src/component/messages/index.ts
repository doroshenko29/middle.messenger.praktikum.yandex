import Block, { IBlockProps } from '../../blocks/block';
import connectToMessages from '../../connectors/connectToMessages';
import Message, { IMessageProps } from '../message';
import Template from './messages.hbs?raw';

function getMessagesBlock(messages?: IMessagesProps["messages"]) {
	if (!messages) {
		return [];
	}
	console.log(messages)
	return messages.map((message) => new Message(message));
}

class Messages extends Block<IMessagesProps> {
	constructor(props: IMessagesProps) {
		super({
			...props,
			Messages: [],
		});
	}

	protected componentDidUpdate(oldProps: IMessagesProps, newProps: IMessagesProps): boolean {
		this.children.Messages = getMessagesBlock(newProps.messages)
		return super.componentDidUpdate(oldProps, newProps);
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export default connectToMessages(Messages);

export interface IMessagesProps extends IBlockProps {
	messages: ReadonlyArray<IMessageProps>;
}
