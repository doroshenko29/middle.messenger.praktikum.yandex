import Block from '../../blocks/block';
import Template from './label.hbs?raw';

export default class LabelBlock extends Block {
	render() {
		return this.compile(Template, this.props);
	}
}
