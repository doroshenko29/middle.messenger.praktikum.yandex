import LogoutApi from "../api/logout.api";
import SignInApi from "../api/signIn.api";
import SignUpApi from "../api/signUp.api";
import PAGE from "../constants/PAGE";
import Router from "../router";

export type ISignInDto = {
    login: string;
    password: string;
}

export type ISignUpDto = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}

class AuthController {
    protected readonly signInApi = new SignInApi();

    protected readonly signUpApi = new SignUpApi();

    protected readonly logoutApi = new LogoutApi();

    public async SignIn(dto: ISignInDto): Promise<void> {
        const [, error] = await this.signInApi.create(JSON.stringify(dto));
        if (!error) {
            new Router().go(PAGE.CHAT);
            return;
        }
        console.warn(error);
    }

    public async SignUp(dto: ISignUpDto): Promise<void> {
        const [result, error] = await this.signUpApi.create<{id: number}>(JSON.stringify(dto));
        if (!error && result.id != null) {
            new Router().go(PAGE.CHAT);
            return;
        }
        console.warn(error);
    }

    public async logout(): Promise<void> {
        const [, error] = await this.logoutApi.create();
        if (!error) {
            new Router().go(PAGE.LOGIN);
            return;
        }
        console.warn(error);
    }
}

export default new AuthController();