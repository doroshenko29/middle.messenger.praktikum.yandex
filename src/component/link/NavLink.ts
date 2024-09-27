import Block from '../../blocks/block';
import Link from './link.hbs?raw';

/** for dev-mode */
export default class NavLinkBlock extends Block {
	render() {
		return this.compile(Link, this.props);
	}
}
