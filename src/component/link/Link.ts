import Block from '../../blocks/block';
import Link from "./link.hbs?raw";

export class LinkBlock extends Block {
    constructor(props) {
      super("div", props);
    }
  
    render() {
      return this.compile(Link, {...this.props})
    }
}
