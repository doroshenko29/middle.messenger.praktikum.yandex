import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./base.api";

const chatsAPIInstance = new HTTPTransport(`${HOST}/api/v2/chats`)

export default class ChatUsersApi extends BaseAPI {
    update(data: string): Promise<string | Error> {
        return chatsAPIInstance.put('/users', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        })
            .then((responce) => responce)
            .catch((error) => error);
    }

    request(id: string): Promise<string | Error> {
        return chatsAPIInstance.get(`/${id}/users`)
            .then((responce) => responce)
            .catch((error) => error);
    }

    delete(data: string): Promise<string | Error> {
        return chatsAPIInstance.delete('/users', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        })
            .then((responce) => responce)
            .catch((error) => error);
    }
}
