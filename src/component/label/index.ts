import Block, { IBlockProps } from '../../blocks/block';
import Template from './label.hbs?raw';

export default class Label extends Block<ILabelProps> {
	render() {
		return this.compile(Template, this.props);
	}
}

export interface ILabelProps extends IBlockProps {
	label?: string;
	name: string;
}
