import Block, { IBlockProps } from '../../blocks/block';
import ButtonTemplate from './button.hbs?raw';

export default class ButtonBlock extends Block<IButtonProps> {
	constructor(protected props: IButtonProps) {
		super(props, 'div');
	}

	render() {
		return this.compile(ButtonTemplate, { ...this.props });
	}
}

export interface IButtonProps extends IBlockProps {
	text: string;
}
