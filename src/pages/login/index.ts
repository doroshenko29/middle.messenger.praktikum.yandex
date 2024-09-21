import Block from '../../blocks/block';
import { ButtonBlock } from '../../component/button/Button';
import { FormFieldBlock } from '../../component/form-field/FormField';
import { LinkBlock } from '../../component/link/Link';
import Template from "./login.hbs?raw";

export class LoginPage extends Block {
    constructor(props) {
      super("div", props);
    }

    render() {
        this.children = {
            linkToRegistration: new LinkBlock({
                dataPage: "registration",
                text: "Нет аккаунта?"
            }),
            buttonSubmit: new ButtonBlock({
                text: "Авторизоваться",
            }),
            fields: this.props.fieldsDto.map(field => (
                new FormFieldBlock(field)
            )),
        }

        return this.compile(Template, {...this.props})
    }
}
