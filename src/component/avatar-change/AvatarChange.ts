import Block from '../../blocks/block';
import Template from './avatar-change.hbs?raw';

export default class AvatarChangeBlock extends Block {
	constructor(props) {
		super('div', { ...props, classNames: ['avatar-change'] });
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}
