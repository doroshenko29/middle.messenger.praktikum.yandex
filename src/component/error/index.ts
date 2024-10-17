import Block, { IBlockProps } from '../../blocks/block';
import Template from './error.hbs?raw';

export default class Error extends Block<IErrorProps> {
	render() {
		return this.compile(Template, this.props);
	}
}

interface IErrorProps extends IBlockProps {
	errorText: string | null;
}
