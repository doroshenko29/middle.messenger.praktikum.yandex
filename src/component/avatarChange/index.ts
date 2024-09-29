import Block from '../../blocks/block';
import Template from './avatarChange.hbs?raw';

export default class AvatarChangeBlock extends Block {
	render() {
		return this.compile(Template, { ...this.props });
	}
}
