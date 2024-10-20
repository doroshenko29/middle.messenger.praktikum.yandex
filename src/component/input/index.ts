import Block, { IBlockProps } from '../../blocks/block';
import Template from './input.hbs?raw';

export default class Input extends Block {
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
	name: string;
	type: string;
	value?: string | number;
	OnBlur?: (value: string | number) => void;
}
