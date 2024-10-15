import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import ResultError, { IResultError } from "../utils/resultError";
import BaseAPI from "./base.api";

const userAPIInstance = new HTTPTransport(`${HOST}/api/v2/user`)

export default class UpdateUserProfileApi extends BaseAPI {
    update<IResponseDto>(data: string): Promise<IResultError<IResponseDto>> {
        return userAPIInstance.put('/profile', {
            headers: {
                'content-type': 'application/json',
            },
            data
        }).then((responce) => ResultError(responce))
    }
}
