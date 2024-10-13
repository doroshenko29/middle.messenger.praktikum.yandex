import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import ResultError, { IResultError } from "../utils/resultError";
import BaseAPI from "./base.api";

const chatsAPIInstance = new HTTPTransport(`${HOST}/api/v2/chats`)

export default class ChatsApi extends BaseAPI {
    create<IResponseDto>(data: string): Promise<IResultError<IResponseDto>> {
        return chatsAPIInstance.post('', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        }).then((responce) => ResultError(responce))
    }

    request<IResponseDto>(querry?: string): Promise<IResultError<IResponseDto>> {
        return chatsAPIInstance.get(querry? `?${querry}` : "").then((responce) => ResultError(responce))
    }

    delete<IResponseDto>(data: string): Promise<IResultError<IResponseDto>> {
        return chatsAPIInstance.delete('', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        }).then((responce) => ResultError(responce))
    }
}
