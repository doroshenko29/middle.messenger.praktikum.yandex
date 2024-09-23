import Block, { IBlockProps } from '../../blocks/block';
import Template from './avatar-change.hbs?raw';

export default class AvatarChangeBlock extends Block<IAvatarProps> {
	constructor(protected props: IAvatarProps) {
		super('div', { ...props, classNames: ['avatar-change'] });
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export interface IAvatarProps extends IBlockProps {
	value: string;
}
