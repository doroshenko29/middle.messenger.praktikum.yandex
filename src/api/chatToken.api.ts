import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./base.api";

const chatsAPIInstance = new HTTPTransport(`${HOST}/api/v2/chats`)

export default class ChatTokenApi extends BaseAPI {
    create(id: number): Promise<string | Error> {
        return chatsAPIInstance.post(`/token/${id}`)
            .then((responce) => responce)
            .catch((error) => error);
    }
}
