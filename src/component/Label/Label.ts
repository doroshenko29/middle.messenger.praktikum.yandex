import Block, { IBlockProps } from '../../blocks/block';
import Template from './Label.hbs?raw';

export default class LabelBlock extends Block<ILabelProps> {
	constructor(protected props: ILabelProps) {
		super(props);
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export interface ILabelProps extends IBlockProps {
	label?: string;
	name: string;
}
