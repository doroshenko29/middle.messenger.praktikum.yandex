import { PAGE } from '../../App';
import Block, { IBlockProps } from '../../blocks/block';
import DevModeNavBlock from '../../component/DevModeNav/DevModeNav';
import LinkBlock from '../../component/link/Link';
import Template from './error.hbs?raw';

export default class ErrorPage extends Block<IErrorPageProps> {
	constructor(protected props: IErrorPageProps) {
		super({ ...props, classNames: ['page'] }, 'div');
	}

	render() {
		this.children = {
			linkToChat: new LinkBlock({
				dataPage: PAGE.CHAT,
				text: 'Назад к чатам',
			}),
			devModeNav: new DevModeNavBlock(),
		};

		return this.compile(Template, { ...this.props });
	}
}

export interface IErrorPageProps extends IBlockProps {
	errorCode: string;
	errorText: string;
}
