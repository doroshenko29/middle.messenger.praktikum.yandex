import { PAGE } from '../../App';
import Block, { IBlockProps } from '../../blocks/block';
import Link from './link.hbs?raw';

export default class LinkBlock extends Block<ILinkProps> {
	constructor(protected props: ILinkProps) {
		super(props, 'div');
	}

	render() {
		return this.compile(Link, { ...this.props });
	}
}

export interface ILinkProps extends IBlockProps {
	text: string;
	extraClass?: string;
	dataPage: PAGE;
}
