import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import ResultError, { IResultError } from "../utils/resultError";
import BaseAPI from "./base.api";

const authAPIInstance = new HTTPTransport(`${HOST}/api/v2/auth`)

export default class LogoutApi extends BaseAPI {
    create(): Promise<IResultError<null>> {
        return authAPIInstance.post('/logout').then((responce) => ResultError(responce))
    }
}
