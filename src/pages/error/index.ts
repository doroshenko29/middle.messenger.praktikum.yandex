import Block, { IBlockProps } from '../../blocks/block';
import Link from '../../component/link';
import PAGE from '../../constants/PAGE';
import Template from './error.hbs?raw';

export default class ErrorPage extends Block {
	constructor(props: IErrorPageProps) {
		super({
			...props,
			LinkToChat: new Link({
				dataPage: PAGE.CHAT,
				text: 'Назад к чатам',
			}),
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}

export interface IErrorPageProps extends IBlockProps {
	errorCode: string;
	errorText: string;
}
