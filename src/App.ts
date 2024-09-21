import Handlebars from "handlebars";
import * as Pages from "./pages";
import { mockLoginData, mockRegistrationData, mockProfileData } from "./mocks";
/* Register partials */
import BackLink from "./partials/back-link.hbs?raw";
import AuthForm from "./partials/auth-form.hbs?raw";
import DevModeNav from "./partials/dev-mode-nav.hbs?raw";
import Link from "./partials/link.hbs?raw";
// import { ButtonBlock } from "./component/button/Button";


Handlebars.registerPartial("BackLink", BackLink);
Handlebars.registerPartial("AuthForm", AuthForm);
Handlebars.registerPartial("DevModeNav", DevModeNav);
Handlebars.registerPartial("Link", Link);

function renderBlock(root, block) {
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}

export default class App {
  constructor() {
    this.state = {
      currentPage: "login",
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    // const button = new ButtonBlock({
    //   text: 'Click me',
    //   events: {
    //     click: event => {
    //       console.log(event)
    //     }
    //   }
    // });

    // const profile = new UserProfile({
    //   userName: 'Joe Doe', 
    //   button,
    // })
    // renderBlock(this.appElement, profile);
    // setTimeout(() => {
    // button.setProps({
    //   text: 'Click me, please',
    // });
    // }, 1000);

    const page = (() => {
      switch (this.state.currentPage) {
        case "login": {
          return new Pages.LoginPage(mockLoginData);
        }
        case "registration": {
          return new Pages.RegistrationPage(mockRegistrationData)
        }
        case "profile": {
          return new Pages.ProfilePage(mockProfileData)
        }
        case "profile-change": {
          return new Pages.ProfileChangePage(mockProfileData)
        }
        case "profile-password-change": {
          return new Pages.ProfilePasswordChangePage(mockProfileData)
        }
        case "error-5**": {
          return new Pages.ErrorPage({
            errorCode: "500",
            errorText: "Мы уже фиксим",
            linkToChat: {
              dataPage: "chat",
              text: "Назад к чатам",
            }
          })
        }
        case "error-404":
        default: {
          return new Pages.ErrorPage({
            errorCode: "404",
            errorText: "Не туда попали",
            linkToChat: {
              dataPage: "chat",
              text: "Назад к чатам",
            }
          })
        }
      }
    })();

    this.appElement.innerHTML = ""
    renderBlock(this.appElement, page);

    this.attachEventListeners();
  }

  attachEventListeners() {
    const footerLinks = document.querySelectorAll("a");
    footerLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
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
