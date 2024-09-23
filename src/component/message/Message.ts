import Block from '../../blocks/block';
import Template from './message.hbs?raw';

export default class MessageBlock extends Block {
	constructor(props) {
		super('div', {...props, classNames: [
			"message",
			props.isMine ? "mine" : null,
		].filter(Boolean)});
		const classNames = ["message"];
		if(this.props.isMine) {
			classNames.push("mine")
		}
		this.setProps({
			classNames,
		})
	}

	render() {
		return this.compile(Template, { ...this.props });
	}
}
