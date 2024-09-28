// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fetchWithRetry(
	url: string,
	options: IHTTPTransportOptions & { tries?: number } = {},
): Promise<Response> {
	const { tries = 1 } = options;

	function onError(err: Error) {
		const triesLeft = tries - 1;
		if (!triesLeft) {
			throw err;
		}

		return fetchWithRetry(url, { ...options, tries: triesLeft });
	}

	return fetch(url, options).catch(onError);
}
