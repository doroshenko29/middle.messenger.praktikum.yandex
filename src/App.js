import Handlebars from 'handlebars';
import * as Pages from './pages';
import {mockLoginData, mockRegistrationData, mockProfileData} from './mocks';
/* Register partials */
import Button from './partials/button.hbs?raw';
import BackLink from './partials/back-link.hbs?raw';
import AuthForm from './partials/auth-form.hbs?raw';
import FormField from './partials/form-field.hbs?raw';
import DevModeNav from './partials/dev-mode-nav.hbs?raw';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('BackLink', BackLink);
Handlebars.registerPartial('AuthForm', AuthForm);
Handlebars.registerPartial('FormField', FormField);
Handlebars.registerPartial('DevModeNav', DevModeNav);

export default class App {
    constructor() {
        this.state = {
          currentPage: 'login',
        };
        this.appElement = document.getElementById('app');
    }

    render() {
        let template;
        switch(this.state.currentPage) {
            case 'login': {
                template = Handlebars.compile(Pages.LoginPage);
                this.appElement.innerHTML = template(mockLoginData);
                break;
            }
            case 'registration': {
                template = Handlebars.compile(Pages.RegistrationPage);
                this.appElement.innerHTML = template(mockRegistrationData);
                break;
            }
            case 'profile': {
                template = Handlebars.compile(Pages.ProfilePage);
                this.appElement.innerHTML = template(mockProfileData);
                break;
            }
            case 'chat': {
                template = Handlebars.compile(Pages.ChatPage);
                this.appElement.innerHTML = template();
                break;
            }
            case 'profile-change': {
                template = Handlebars.compile(Pages.ProfileChangePage);
                this.appElement.innerHTML = template(mockProfileData);
                break;
            }
            case 'profile-password-change': {
                template = Handlebars.compile(Pages.ProfilePasswordChangePage);
                this.appElement.innerHTML = template(mockProfileData);
                break;
            }
            case 'error-404': {
                template = Handlebars.compile(Pages.ErrorPage);
                this.appElement.innerHTML = template({
                    errorCode: "404",
                    errorText: "Не туда попали",
                });
                break;
            }
            case 'error-5**': {
                template = Handlebars.compile(Pages.ErrorPage);
                this.appElement.innerHTML = template({
                    errorCode: "500",
                    errorText: "Мы уже фиксим",
                });
                break;
            }
        }
        
        this.attachEventListeners();
    }

    attachEventListeners() {
        const footerLinks = document.querySelectorAll('a');
        footerLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            this.changePage(e.target.dataset.page);
          });
        });
    }
    
    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }
}
