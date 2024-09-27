import Block, { IBlockProps } from '../../blocks/block';
import Template from './Input.hbs?raw';

export default class InputBlock extends Block<IInputProps> {
	constructor(protected props: IInputProps) {
		super({
			...props,
			events: {
				blur: (event) => {
					console.log('BLUR')
					event.preventDefault();
					if (this.props.OnBlur) {
						this.props.OnBlur(event);
					}
				},
			},
		});
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}

export interface IInputProps extends IBlockProps {
	name: string;
	type: string;
	value?: string | number;
	OnBlur?: (event: Event) => void;
}
