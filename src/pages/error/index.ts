import Block, { IBlockProps } from '../../blocks/block';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import Link from '../../component/link/Link';
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
			DevModeNav: new DevModeNavBlock(),
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
