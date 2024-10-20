import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./base.api";

const authAPIInstance = new HTTPTransport(`${HOST}/api/v2/auth`)

export default class SignUpApi extends BaseAPI {
    create(data: string): Promise<string | Error> {
        return authAPIInstance.post('/signup', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        })
            .then((responce) => responce)
            .catch((error) => error);
    }
}
