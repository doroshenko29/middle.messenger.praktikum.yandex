import Block, { IBlockProps } from '../../blocks/block';
import Template from './Input.hbs?raw';

class InputBlock extends Block {
	constructor(props: IInputProps) {
		super({
			...props,
			events: {
				blur: (event) => {
					event.preventDefault();
					event.stopImmediatePropagation();
					if (props.OnBlur) {
						props.OnBlur((event.target as HTMLInputElement).value);
					}
				},
			},
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}

export interface IInputProps extends IBlockProps {
	OnBlur?: (value: string | number) => void;
}

export default InputBlock;
