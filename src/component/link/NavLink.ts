import Block from '../../blocks/block';
import { ILinkProps } from './Link';
import Link from './link.hbs?raw';

export default class NavLinkBlock extends Block<ILinkProps> {
	constructor(protected props: ILinkProps) {
		super(props, 'li');
	}

	render() {
		return this.compile(Link, { ...this.props });
	}
}
