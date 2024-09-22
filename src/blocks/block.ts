import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from '../utils/event-bus';
import NeedArray from '../utils/NeedArray';

type IChildren = Record<string, Array<Block> | Block>;

export default class Block<IProps extends IBlockProps = IBlockProps> {
	protected eventBus: () => EventBus;

	protected children: IChildren;

	protected props: Partial<IProps> = {};

	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	_element: null | HTMLElement = null;

	_meta: null | {
		tagName: string;
		props: Partial<IProps>;
	} = null;

	_id: string | null = null;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */

	constructor(
		tagName = 'div',
		propsAndChildren: Partial<IProps> & IChildren = {},
	) {
		const { children, props = {} } = this._getChildren(propsAndChildren);
		this.children = children;

		const eventBus = new EventBus();

		this._meta = {
			tagName,
			props,
		};

		this._id = makeUUID();

		this.props = this._makePropsProxy({ ...props, __id: this._id });

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	events: Record<string, () => void>;

	_addEvents() {
		const { events = {} } = this.props;
		Object.keys(events).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents() {
		const { events = {} } = this.props;
		Object.keys(events).forEach((eventName) => {
			this._element?.removeEventListener(eventName, events[eventName]);
		});
	}

	_getChildren(propsAndChildren) {
		const children = {};
		const props = {};

		// @todo for of
		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	_registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		const {
			tagName,
			props: { classNames },
		} = this._meta!;
		this._element = this._createDocumentElement(tagName, classNames);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidMount() {
		this.componentDidMount();

		Object.values(this.children).forEach((child) => {
			for (const _child of NeedArray(child)) {
				_child.dispatchComponentDidMount();
			}
		});
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidMount() {}

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidUpdate(oldProps, newProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps, newProps) {
		return true;
	}

	setProps = (nextProps) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	_render() {
		const block = this.render();

		this._removeEvents();

		this._element!.innerHTML = '';
		this._element?.appendChild(block!);

		this._addEvents();
	}

	// Может переопределять пользователь, необязательно трогать
	render(): Node | null {
		return null;
	}

	getContent(): HTMLElement | null {
		return this.element;
	}

	_makePropsProxy(props) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop, value) {
				target[prop] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	_createDocumentElement(
		tagName: string,
		classNames: IProps['classNames'] = [],
	) {
		const element = document.createElement(tagName);
		element.setAttribute('data-id', this._id!);
		element.classList.add(...classNames);
		return element;
	}

	show() {
		this.getContent()!.style.display = 'block';
	}

	hide() {
		this.getContent()!.style.display = 'none';
	}

	compile(_template, props) {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = NeedArray(child).reduce(
				(acc, current) => (acc += `<div data-id="${current._id}"></div>`),
				'',
			);
		});

		const fragment = this._createDocumentElement('template');

		const template = Handlebars.compile(_template);

		fragment.innerHTML = template({ ...propsAndStubs });

		Object.values(this.children).forEach((child) => {
			NeedArray(child).forEach((_child) => {
				const stub = fragment.content.querySelector(
					`[data-id="${_child._id}"]`,
				);

				stub.replaceWith(_child.getContent());
			});
		});

		return fragment.content;
	}
}

export interface IBlockProps {
	events: Record<string, () => void>;
	classNames: Array<string>;
}
