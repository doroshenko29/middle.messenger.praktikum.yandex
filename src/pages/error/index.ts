import { PAGE } from '../../App';
import Block, { IBlockProps } from '../../blocks/block';
import LinkBlock from '../../component/link/Link';
import Template from './error.hbs?raw';

export default class ErrorPage extends Block<IErrorPageProps> {
	constructor(protected props: IErrorPageProps) {
		super('div', { ...props, classNames: ['page'] });
	}

	render() {
		this.children = {
			linkToChat: new LinkBlock({
				dataPage: PAGE.CHAT,
				text: 'Назад к чатам',
			}),
		};

		return this.compile(Template, { ...this.props });
	}
}


export interface IErrorPageProps extends IBlockProps {
	errorCode: string;
	errorText: string;
}
