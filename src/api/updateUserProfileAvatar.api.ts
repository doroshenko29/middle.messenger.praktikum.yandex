import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import ResultError, { IResultError } from "../utils/resultError";
import BaseAPI from "./base.api";

const userAPIInstance = new HTTPTransport(`${HOST}/api/v2/user`)

export default class UpdateUserProfileAvatarApi extends BaseAPI {
    update<IResponseDto>(data: FormData): Promise<IResultError<IResponseDto>> {
        return userAPIInstance.put('/profile/avatar', {data}).then((responce) => ResultError(responce))
    }
}
