import Block, { IBlockProps } from '../../blocks/block';
import Template from './chat.hbs?raw';

export default class Chat extends Block<IChatProps> {
	constructor(props: IChatProps) {
		super({
			...props,
			events: {
				click: (event) => {
					event.preventDefault();
					if(props.onClick) {
						props.onClick(event);
					}
				},
			},
		});
	}
	
	render() {
		return this.compile(Template, this.props);
	}
}

interface IChatProps extends IBlockProps {
	id: number;
	title: string;
	message?: string;
	time?: string;
	unreadsCount?: number;
	myMessage?: boolean;
	isActive?: boolean;
	onClick?: (e: Event) => void
}
