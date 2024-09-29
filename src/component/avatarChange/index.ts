import Block, { IBlockProps } from '../../blocks/block';
import Template from './avatarChange.hbs?raw';

export default class AvatarChange extends Block<IAvatarChangeProps> {
	render() {
		return this.compile(Template, { ...this.props });
	}
}

interface IAvatarChangeProps extends IBlockProps {
	value: string;
}
