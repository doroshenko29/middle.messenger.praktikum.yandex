import GetUserInfoApi from "../api/getUserInfo.api";
import UpdateUserPasswordApi from "../api/updateUserPassword.api";
import UpdateUserProfileApi from "../api/updateUserProfile.api";
import UpdateUserProfileAvatarApi from "../api/updateUserProfileAvatar.api";
import Store from '../store/store';
import { IUserInfoDto } from "../types/IUserInfoDto";
import { INullable } from "../utils/INullable";
import { IResultError } from "../utils/resultError";

export type IUserPasswordChangeDto = {
    oldPassword: string;
    newPassword: string;
}

class UserInfoController {
    public async GetUserInfo(force = true): Promise<INullable<IUserInfoDto>> {
        if(!force && Store.getState<IUserInfoDto>()?.user != null) {
            return Store.getState<IUserInfoDto>()?.user
        }
        const [result, error] = await new GetUserInfoApi().request<IUserInfoDto>();
        if (!error && result != null) {
            Store.set('user', result);
        }
        return result;
    }

    public async UpdateUserInfo(dto: IUserInfoDto): Promise<void> {
        const [result, error] = await new UpdateUserProfileApi().update<IUserInfoDto>(JSON.stringify(dto));
        if (!error && result != null) {
            Store.set('user', result);
            return;
        }
        console.warn(error);
    }

    public async UpdateUserPassword(dto: IUserPasswordChangeDto): Promise<IResultError<IUserPasswordChangeDto>> {
        return new UpdateUserPasswordApi().update<IUserPasswordChangeDto>(JSON.stringify(dto));
    }

    public async UpdateProfileAvatar(dto: FormData): Promise<void> {
        const [result, error] = await new UpdateUserProfileAvatarApi().update(dto);
        if (!error && result != null) {
            Store.set('user', result);
            return;
        }
        console.warn(error);
    }
}

export default new UserInfoController();
