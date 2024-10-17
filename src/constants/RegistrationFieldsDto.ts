const REGISTRATION_FIELDS_DTO = [
	{
		class: "form",
		label: 'Почта',
		name: 'email',
		type: 'email',
	},
	{
		class: "form",
		label: 'Логин',
		name: 'login',
		type: 'text',
	},
	{
		class: "form",
		label: 'Имя',
		name: 'first_name',
		type: 'text',
	},
	{
		class: "form",
		label: 'Фамилия',
		name: 'second_name',
		type: 'text',
	},
	{
		class: "form",
		label: 'Телефон',
		name: 'phone',
		type: 'phone',
	},
	{
		class: "form",
		label: 'Пароль',
		name: 'password',
		type: 'password',
	},
	{
		class: "form",
		label: 'Пароль (ещё раз)',
		name: 'password',
		type: 'password',
	},
];

export default REGISTRATION_FIELDS_DTO;
