import Block, { IBlockProps } from "../../blocks/block";
import Template from './modal.hbs?raw';

export default class Modal extends Block {
    constructor(props: IModalProps) {
		super({
			...props,
			events: {
                submit: async (event) => {
                    event.preventDefault();
                    if(props.OnSubmit) {
                        props.OnSubmit(event)
                    }           
                },
                click: (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    this.hide();
                },
            },
		});
    }

    hide(): void {
        this.dettachEventListener();
        this.setProps({
            show: false,
        })
    }

    show(): void {
        this.setProps({
            show: true,
        })

        this.attachEventListener();
    }

    preventEvents(e: Event) {
        e.stopImmediatePropagation();
    }

    attachEventListener() {
		const modalForm = document.getElementById('modalForm')!;
        modalForm.addEventListener('click', this.preventEvents);
	}

    dettachEventListener() {
		const modalForm = document.getElementById('modalForm')!;
        modalForm.removeEventListener('click', this.preventEvents);
	}

    render() {
		return this.compile(Template, this.props);
	}
}

export interface IModalProps extends IBlockProps {
	show?: boolean;
    OnSubmit?: (event: Event) => Promise<void>;
}
