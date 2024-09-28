const VALIDATOR: Record<string, RegExp> = {
	login: /^(?=.*?[A-Za-z]).[A-Za-z\d\-\\_]{2,19}$/gm,
	password: /^(?=.*?[A-Z])(?=.*?[\d]).{7,39}$/gm,
	first_name: /^[A-ZА-Я]{1}[a-zA-Zа-яёА-ЯЁ-]*$/gm,
	second_name: /^[A-ZА-Я]{1}[a-zA-Zа-яёА-ЯЁ-]*$/gm,
	email: /^[\w-_]+@([A-Za-z]+\.)+[\w-]*$/gm,
	phone: /^[+?]{0,1}[0-9]{10,15}$/gm,
	message: /^\S*$/gm,
};

export default VALIDATOR;
