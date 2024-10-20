import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./base.api";

const chatsAPIInstance = new HTTPTransport(`${HOST}/api/v2/chats`)

export default class ChatsApi extends BaseAPI {
    create(data: string): Promise<string | Error> {
        return chatsAPIInstance.post('', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        })
            .then((responce) => responce)
            .catch((error) => error);
    }

    request(querry?: string): Promise<string | Error> {
        return chatsAPIInstance.get(querry? `?${querry}` : "")
            .then((responce) => responce)
            .catch((error) => error);
    }

    delete(data: string): Promise<string | Error> {
        return chatsAPIInstance.delete('', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        })
            .then((responce) => responce)
            .catch((error) => error);
    }
}
