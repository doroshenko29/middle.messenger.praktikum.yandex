import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
  root: resolve(__dirname, 'src'),
  css: ["@/style.css"],
  plugins: [
    handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
        context: {
            titleTest: 'Hello, world!',
            error404: {
                errorCode: "404",
                errorText: "Не туда попали",
            },
            error500: {
                errorCode: "500",
                errorText: "Мы уже фиксим",
            },
            login: {
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
            },
            registration: {
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
            }
        },
    }),
  ],
};