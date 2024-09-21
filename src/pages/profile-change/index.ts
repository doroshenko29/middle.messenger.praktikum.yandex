import Block from '../../blocks/block';
import { AvatarChangeBlock } from '../../component/avatar-change/AvatarChange';
import { ButtonBlock } from '../../component/button/Button';
import { FormFieldBlock } from '../../component/form-field/FormField';
import Template from "./profile-change.hbs?raw";

export class ProfileChangePage extends Block {
    constructor(props) {
      super("div", props);
    }

    render() {
        this.children = {
            fields: this.props.fieldsDto.map(field => (
                new FormFieldBlock(field)
            )),
            avatar: new AvatarChangeBlock({
                value: "",
            }),
            button: new ButtonBlock({
                text: 'Сохранить',
            })
        }

        return this.compile(Template, {...this.props})
    }
}
