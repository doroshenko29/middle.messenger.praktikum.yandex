export const mockLoginData = {
    title: 'Вход',
    fields: [
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
        },
        {
            label: 'Пароль',
            name: 'password',
            type: 'password',
        }
    ]
};

export const mockRegistrationData = {
    title: 'Регистрация',
    fields: [
        {
            label: 'Почта',
            name: 'email',
            type: 'email',
        },
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
        },
        {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
        },
        {
            label: 'Телефон',
            name: 'phone',
            type: 'phone',
        },
        {
            label: 'Пароль',
            name: 'password',
            type: 'password',
        },
        {
            label: 'Пароль (ещё раз)',
            name: 'password',
            type: 'password',
        }
    ]
};

export const mockProfileData = {
    fields: [
        {
            label: 'Почта',
            name: 'email',
            type: 'email',
            value: 'pochta@yandex.ru',
        },
        {
            label: 'Логин',
            name: 'login',
            type: 'text',
            value: 'ivanivanov',
        },
        {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            value: 'Иван',
        },
        {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            value: 'Иванов',
        },
        {
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            value: 'Иван',
        },
        {
            label: 'Телефон',
            name: 'phone',
            type: 'phone',
            value: '+7(909)9673030',
        },
    ],
    password_fields: [
        {
            label: 'Старый пароль',
            name: 'oldPassword',
            type: 'password',
            value: 'current_password'
        },
        {
            label: 'Новый пароль',
            name: 'newPassword',
            type: 'password',
            value: 'new_password'
        },
        {
            label: 'Повторите новый пароль',
            name: 'newPassword',
            type: 'password',
            value: 'new_password'
        }
    ]
};