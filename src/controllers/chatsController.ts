import ChatsApi from "../api/chats.api";
import queryString from "../utils/queryString";
import Store from '../store/store';
import { IUserInfoDto } from "../types/IUserInfoDto";
import { INullable } from "../utils/INullable";
import ChatUsersApi from "../api/chatUsers.api";

type ILastMessageDto = {
    user: IUserInfoDto,
    time: string;
    content: string;
}

export type IChatDto = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: ILastMessageDto
}

type IGetChatsParams = {
    title?: string;
    offset?: number;
    limit?: number;
}

export type ICreateChatDto = {
    title: string;
}

class ChatsController {
    protected readonly chatsApi = new ChatsApi();

    protected readonly chatUsersApi = new ChatUsersApi();

    public async AddUserToChat(users: number[]): Promise<boolean> {
        const [, error] = await this.chatUsersApi.update(JSON.stringify({
            users,
            chatId: this.getCurrentChatId(),
        }));
        if (!error) {
            return true;
        }
        return false;
    }

    public async RemoveUserFromChat(users: number[]): Promise<boolean> {
        const [, error] = await this.chatUsersApi.delete(JSON.stringify({
            users,
            chatId: this.getCurrentChatId(),
        }));
        if (!error) {
            return true;
        }
        return false;
    }

    public async CreateChat(dto: ICreateChatDto): Promise<boolean> {
        const [, error] = await this.chatsApi.create(JSON.stringify(dto));
        if (!error) {
            this.GetChats({}, true);
            return true;
        }
        return false;
    }

    // add params
    public async GetChats(querry: IGetChatsParams = {}, force = true): Promise<INullable<ReadonlyArray<IChatDto>>> {
        if(!force && Store.getState<ReadonlyArray<IChatDto>>()?.chats != null) {
            return Store.getState<ReadonlyArray<IChatDto>>()?.chats
        }
        const [result, error] = await this.chatsApi.request<ReadonlyArray<IChatDto>>(queryString(querry));
        if (!error && result != null) {
            Store.set('chats', result);
        }
        return result;
    }

    public async RemoveChat(chatId?: number) {
        const [, error] = await this.chatsApi.delete(JSON.stringify({chatId}));
        if (!error) {
            const chats = Store.getState<ReadonlyArray<IChatDto>>()?.chats;
            Store.set('chats', chats.filter(({id}) => id !== chatId));
            this.setCurrentChatId(null);
        }
    }

    public setCurrentChatId(id: number | null) {
        Store.set('currentChatId', id);
    }

    public getCurrentChatId(): number | null {
        return Store.getState<number | null>()?.currentChatId;
    }
}

export default new ChatsController();
