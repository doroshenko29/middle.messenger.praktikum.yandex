function isPlainObject(value: unknown) {
    return typeof value === 'object';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown) {
    return isPlainObject(value) || isArray(value);
}

export default function isEqual(a: object | string, b: object | string): boolean {
        if(typeof a === "string" && typeof b === "string") {
            return a === b;
        }
		if(Object.keys(a).length !== Object.keys(b).length) {
			return false;
		}
		for(const [key, value] of Object.entries(a)) {
			const rhs = b[key as keyof typeof b];
			if (isArrayOrObject(value) && isArrayOrObject(rhs)) {
                if (!isEqual(value as object, rhs)) {
                    return false;
                }
          
            }
			if(value !== rhs) {
				return false;
			}
		}
		return true;
}
