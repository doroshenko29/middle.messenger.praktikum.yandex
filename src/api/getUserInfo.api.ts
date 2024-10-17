import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./base.api";

const authAPIInstance = new HTTPTransport(`${HOST}/api/v2/auth`)

export default class GetUserInfoApi extends BaseAPI {
    request(): Promise<string | Error> {
        return authAPIInstance.get('/user')
            .then((responce) => responce)
            .catch((error) => error);
    }
}
