import Block from '../../blocks/block';
import Template from './Link.hbs?raw';

export default class Link extends Block {
	render() {
		return this.compile(Template, this.props);
	}
}
