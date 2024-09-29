import PAGE from './PAGE';

const PROFILE_LINKS_DTO = [
	{
		dataPage: PAGE.PROFILE_CHANGE,
		text: 'Изменить данные',
	},
	{
		dataPage: PAGE.PROFILE_CHANGE_PASSWORD,
		text: 'Изменить пароль',
	},
	{
		dataPage: PAGE.LOGIN,
		text: 'Выйти',
		extraClass: ' exit-link',
	},
];

export default PROFILE_LINKS_DTO;
