import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import ResultError, { IResultError } from "../utils/resultError";
import BaseAPI from "./base.api";

const authAPIInstance = new HTTPTransport(`${HOST}/api/v2/auth`)

export default class GetUserInfoApi extends BaseAPI {
    request<IResponseDto>(): Promise<IResultError<IResponseDto>> {
        return authAPIInstance.get('/user').then((responce) => ResultError(responce))
    }
}
