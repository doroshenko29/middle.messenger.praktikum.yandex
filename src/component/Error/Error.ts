import Block from '../../blocks/block';
import Template from './Error.hbs?raw';

export default class ErrorBlock extends Block {
	render() {
		return this.compile(Template, this.props);
	}
}
