import Block from '../../blocks/block';
import { ButtonBlock } from '../../component/button/Button';
import { FormFieldBlock } from '../../component/form-field/FormField';
import { LinkBlock } from '../../component/link/Link';
import Template from "./registration.hbs?raw";

export class RegistrationPage extends Block {
    constructor(props) {
      super("div", props);
    }

    render() {
        this.children = {
            linkToAuthorize: new LinkBlock({
                dataPage: "login",
                text: "Войти"
            }),
            buttonSubmit: new ButtonBlock({
                text: "Зарегистрироваться",
            }),
            fields: this.props.fieldsDto.map(field => (
                new FormFieldBlock(field)
            )),
        }

        return this.compile(Template, {...this.props})
    }
}
