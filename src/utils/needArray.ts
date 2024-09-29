export default function NeedArray<T = unknown>(
	element: T | Array<T>,
): Array<T> {
	if (Array.isArray(element)) {
		return element;
	}
	return [element];
}
