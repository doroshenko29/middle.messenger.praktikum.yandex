import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import ResultError, { IResultError } from "../utils/resultError";
import BaseAPI from "./base.api";

const authAPIInstance = new HTTPTransport(`${HOST}/api/v2/auth`)

export default class SignUpApi extends BaseAPI {
    create<IResponseDto>(data: string): Promise<IResultError<IResponseDto>> {
        return authAPIInstance.post('/signup', {
            headers: {
                'content-type': 'application/json',
            },
            data,
        }).then((responce) => ResultError(responce))
    }
}
