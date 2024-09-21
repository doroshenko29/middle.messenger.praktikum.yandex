export default class EventBus {
	protected listeners: Record<string, Array<(args?: unknown) => void>>;

	constructor() {
		this.listeners = {};
	}

	on(event, callback) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event, callback) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback,
		);
	}

	emit(event, ...args) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach((listener) => {
			listener(...args);
		});
	}
}
