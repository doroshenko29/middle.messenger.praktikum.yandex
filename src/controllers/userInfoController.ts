import GetUserInfoApi from "../api/getUserInfo.api";
import UpdateUserPasswordApi from "../api/updateUserPassword.api";
import UpdateUserProfileApi from "../api/updateUserProfile.api";
import UpdateUserProfileAvatarApi from "../api/updateUserProfileAvatar.api";
import Store from '../store/store';
import { IUserInfoDto } from "../types/IUserInfoDto";
import { INullable } from "../utils/INullable";
import resultError, { IResultError } from "../utils/resultError";

export type IUserPasswordChangeDto = {
    oldPassword: string;
    newPassword: string;
}

class UserInfoController {
    public async GetUserInfo(force = true): Promise<INullable<IUserInfoDto>> {
        if(!force && Store.getState<IUserInfoDto>()?.user != null) {
            return Store.getState<IUserInfoDto>()?.user
        }
        const [result, error] = resultError<IUserInfoDto>(await new GetUserInfoApi().request());
        if (!error && result != null) {
            Store.set('user', result);
        }
        return result;
    }

    public async UpdateUserInfo(dto: IUserInfoDto): Promise<void> {
        const [result, error] = resultError<IUserInfoDto>(await new UpdateUserProfileApi().update(JSON.stringify(dto)));
        if (!error && result != null) {
            Store.set('user', result);
            return;
        }
        console.warn(error);
    }

    public async UpdateUserPassword(dto: IUserPasswordChangeDto): Promise<IResultError<IUserPasswordChangeDto>> {
        return resultError<IUserPasswordChangeDto>(await new UpdateUserPasswordApi().update(JSON.stringify(dto)));
    }

    public async UpdateProfileAvatar(dto: FormData): Promise<void> {
        const [result, error] = resultError(await new UpdateUserProfileAvatarApi().update(dto));
        if (!error && result != null) {
            Store.set('user', result);
            return;
        }
        console.warn(error);
    }
}

export default new UserInfoController();
