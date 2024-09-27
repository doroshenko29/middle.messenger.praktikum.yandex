import Block, { IBlockProps } from '../../blocks/block';
import Template from './Error.hbs?raw';

export default class ErrorBlock extends Block<IErrorProps> {
	constructor(protected props: IErrorProps) {
		super(props);
	}

	render() {
		return this.compile(Template, this.props);
	}
}

export interface IErrorProps extends IBlockProps {
	errorText?: string | null;
}
