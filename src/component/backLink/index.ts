import Block from '../../blocks/block';
import Router from '../../router';
import Template from './backLink.hbs?raw';

export default class BackLink extends Block {
	private readonly router = new Router();
	
	constructor() {
		super({
			events: {
				click: (event) => {
					event.preventDefault();
					// const router = new Router();
					this.router.back();
				},
			},
		});
	}

	render() {
		return this.compile(Template, this.props);
	}
}
