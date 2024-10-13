import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import ResultError, { IResultError } from "../utils/resultError";
import BaseAPI from "./base.api";

const chatsAPIInstance = new HTTPTransport(`${HOST}/api/v2/chats`)

export default class ChatTokenApi extends BaseAPI {
    create<IResponseDto>(id: number): Promise<IResultError<IResponseDto>> {
        return chatsAPIInstance.post(`/token/${id}`).then((responce) => ResultError(responce))
    }
}
