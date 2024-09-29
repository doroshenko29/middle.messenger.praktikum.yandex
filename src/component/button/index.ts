import Block, { IBlockProps } from '../../blocks/block';
import Template from './button.hbs?raw';

export default class Button extends Block<IButtonProps> {
	render() {
		return this.compile(Template, this.props);
	}
}

interface IButtonProps extends IBlockProps {
	text: string;
	class?: string;
}
