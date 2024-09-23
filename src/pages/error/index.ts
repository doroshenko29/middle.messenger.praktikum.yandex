import Block from '../../blocks/block';
import LinkBlock from '../../component/link/Link';
import Template from './error.hbs?raw';

export default class ErrorPage extends Block {
	constructor(props) {
		super('div', {...props, classNames: ["page"]});
	}

	render() {
		this.children.linkToChat = new LinkBlock({
			...this.props.linkToChat,
		});

		return this.compile(Template, { ...this.props });
	}
}
