const VALIDATOR: Record<string, RegExp> = {
	login: /^(?=.*?[A-Za-z]).[A-Za-z\d\-\\_]{2,19}$/gm,
	password: /^(?=.*?[A-Z])(?=.*?[\d]).{7,39}$/gm,
};

export default VALIDATOR;
