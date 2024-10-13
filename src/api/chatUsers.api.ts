import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import ResultError, { IResultError } from "../utils/resultError";
import BaseAPI from "./base.api";

const chatsAPIInstance = new HTTPTransport(`${HOST}/api/v2/chats`)

export default class ChatUsersApi extends BaseAPI {
    update<IResponseDto>(data: string): Promise<IResultError<IResponseDto>> {
        return chatsAPIInstance.put('/users', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        }).then((responce) => ResultError(responce))
    }

    request<IResponseDto>(id: string): Promise<IResultError<IResponseDto>> {
        return chatsAPIInstance.get(`/${id}/users`).then((responce) => ResultError(responce))
    }

    delete<IResponseDto>(data: string): Promise<IResultError<IResponseDto>> {
        return chatsAPIInstance.delete('/users', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        }).then((responce) => ResultError(responce))
    }
}
