import Block from '../../blocks/block';
import Link from './link.hbs?raw';

export default class LinkBlock extends Block {
	render() {
		return this.compile(Link, this.props);
	}
}
