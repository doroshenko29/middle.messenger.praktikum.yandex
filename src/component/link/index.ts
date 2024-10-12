import Block, { IBlockProps } from '../../blocks/block';
import PAGE from '../../constants/PAGE';
import Router from '../../router';
import Template from './link.hbs?raw';

export default class Link extends Block<ILinkProps> {
	constructor(props: ILinkProps) {
		super({
			...props,
			events: {
				click: (event) => {
					event.preventDefault();
					const router = new Router();
					router.go(props.dataPage);
				},
			},
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}

interface ILinkProps extends IBlockProps {
	dataPage: PAGE,
	text: string,
	class?: string,
}
