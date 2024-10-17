import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./base.api";

const authAPIInstance = new HTTPTransport(`${HOST}/api/v2/auth`)

export default class LogoutApi extends BaseAPI {
    create(): Promise<string | Error> {
        return authAPIInstance.post('/logout')
            .then((responce) => responce)
            .catch((error) => error);
    }
}
