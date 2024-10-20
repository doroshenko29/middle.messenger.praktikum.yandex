import HOST from "../constants/HOST";
import HTTPTransport from "../utils/HTTPTransport";
import BaseAPI from "./base.api";

const userAPIInstance = new HTTPTransport(`${HOST}/api/v2/user`)

export default class UpdateUserProfileAvatarApi extends BaseAPI {
    update(data: FormData): Promise<string | Error> {
        return userAPIInstance.put('/profile/avatar', {data})
            .then((responce) => responce)
            .catch((error) => error);
    }
}
