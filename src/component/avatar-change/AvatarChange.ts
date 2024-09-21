import Block from '../../blocks/block';
import Template from "./avatar-change.hbs?raw";

export class AvatarChangeBlock extends Block {
    constructor(props) {
      super("div", props);
    }
  
    render() {
      return this.compile(Template, {...this.props})
    }
}
