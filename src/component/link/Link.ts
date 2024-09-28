import Block from '../../blocks/block';
import Template from './link.hbs?raw';

export default class Link extends Block {
	render() {
		return this.compile(Template, this.props);
	}
}
