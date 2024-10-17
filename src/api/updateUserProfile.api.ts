import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./base.api";

const userAPIInstance = new HTTPTransport(`${HOST}/api/v2/user`)

export default class UpdateUserProfileApi extends BaseAPI {
    update(data: string):  Promise<string | Error> {
        return userAPIInstance.put('/profile', {
            headers: {
                'content-type': 'application/json',
            },
            data
        })
            .then((responce) => responce)
            .catch((error) => error);
    }
}
