import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from '../utils/event-bus';
import NeedArray from '../utils/NeedArray';

interface IChildren {
	[key: string]: Block | Array<Block>;
}

export interface IBlockProps {
	events?: Record<string, EventListener | undefined>;
	[key: string]: unknown;
}

abstract class Block {
	protected eventBus: () => EventBus;

	protected children: IChildren;

	protected props: IBlockProps;

	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	protected _element: HTMLElement | null = null;

	protected id: string | null = null;

	constructor(propsWithChildren: IBlockProps = {}) {
		const { children, props } = this._getChildrenAndProps(propsWithChildren);
		this.children = children;

		const eventBus = new EventBus();

		this.id = makeUUID();

		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	_addEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			if (events[eventName]) {
				this._element?.addEventListener(eventName, events[eventName]!);
			}
		});
	}

	_removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			if (events[eventName]) {
				this._element?.removeEventListener(eventName, events[eventName]!);
			}
		});
	}

	_getChildrenAndProps(propsAndChildren: IBlockProps) {
		const props = Object.create({});
		const children = Object.create({});

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (
				value instanceof Block ||
				(Array.isArray(value) && value.every((item) => item instanceof Block))
			) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { props, children };
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	init() {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidMount() {
		this.componentDidMount();
	}

	componentDidMount() {}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);

		Object.values(this.children).forEach((child) => {
			NeedArray(child).forEach((_child) => {
				_child.dispatchComponentDidMount();
			});
		});
	}

	private _componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	protected componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
		return oldProps !== newProps;
	}

	setProps = (nextProps: IBlockProps) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	protected _render() {
		const block = this.render();

		const newElement = block.firstElementChild as HTMLElement;

		if (this._element) {
			this._removeEvents();
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
	}

	// Может переопределять пользователь, необязательно трогать
	render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent() {
		return this.element;
	}

	protected _makePropsProxy(props: IBlockProps) {
		return new Proxy<IBlockProps>(props, {
			get: (target, prop) => {
				const value = target[prop as keyof IBlockProps];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target, prop, value) => {
				Object.assign(target, { [prop]: value });
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty: () => {
				throw new Error('Нет доступа');
			},
		});
	}

	show() {
		this.getContent()!.style.display = 'block';
	}

	hide() {
		this.getContent()!.style.display = 'none';
	}

	compile(_template: string, props: IBlockProps) {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				propsAndStubs[key] = child.map(
					(item) => `<div data-id="${item.id}"></div>`,
				);
			} else {
				propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
			}
		});

		const fragment = document.createElement('template');

		const template = Handlebars.compile(_template);

		fragment.innerHTML = template({ ...propsAndStubs });

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((item) => {
					const stub = fragment.content.querySelector(`[data-id="${item.id}"]`);

					if (!stub) {
						return;
					}

					item.getContent()?.append(...Array.from(stub.childNodes));
					stub.replaceWith(item.getContent()!);
				});
			} else {
				const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

				if (!stub) {
					return;
				}

				child.getContent()?.append(...Array.from(stub.childNodes));
				stub.replaceWith(child.getContent()!);
			}
		});

		return fragment.content;
	}
}

export default Block;
