const METHODS: Record<string, string> = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE',
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: Document | XMLHttpRequestBodyInit) {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}
	// Можно делать трансформацию GET-параметров в отдельной функции
	const arr = Object.entries(data).reduce<Array<string>>(
		(prev, [key, value]) => prev.concat(`${key}=${value.toString()}`),
		[],
	);

	return arr.length ? `?${arr.join('&')}` : '';
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class HTTPTransport {
	get = (url: string, options: IHTTPTransportOptions = {}) =>
		this.request(url, { ...options, method: METHODS.GET }, options.timeout);

	put = (url: string, options: IHTTPTransportOptions = {}) =>
		this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

	post = (url: string, options: IHTTPTransportOptions = {}) =>
		this.request(url, { ...options, method: METHODS.POST }, options.timeout);

	delete = (url: string, options: IHTTPTransportOptions = {}) =>
		this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

	// PUT, POST, DELETE

	// options:
	// headers — obj
	// data — obj
	request = (
		url: string,
		options: IHTTPTransportOptions & { method: keyof typeof METHODS },
		timeout = 5000,
	) =>
		new Promise((resolve, reject) => {
			const { headers = {}, method, data } = options;
			if (!method) {
				reject(new Error('No method'));
				return;
			}
			const xml = new XMLHttpRequest();
			xml.open(
				options.method,
				method === METHODS.GET && !!data
					? `${url}${queryStringify(data)}`
					: url,
			);

			Object.keys(headers).forEach((key) => {
				xml.setRequestHeader(key, headers[key]);
			});

			xml.onload = function () {
				resolve(xml);
			};

			xml.onerror = reject;
			xml.onerror = reject;
			xml.ontimeout = reject;

			xml.timeout = timeout;

			if (options.method === METHODS.GET || !data) {
				xml.send();
			} else {
				xml.send(options.data);
			}
		});
}

interface IHTTPTransportOptions {
	timeout?: number;
	headers?: Record<string, string>;
	data?: Document | XMLHttpRequestBodyInit | null;
}
