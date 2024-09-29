import Block, { IBlockProps } from '../../blocks/block';
import PAGE from '../../constants/PAGE';
import Template from './link.hbs?raw';

export default class Link extends Block<ILinkProps> {
	render() {
		return this.compile(Template, this.props);
	}
}

interface ILinkProps extends IBlockProps {
	dataPage: PAGE,
	text: string,
	class?: string,
}
