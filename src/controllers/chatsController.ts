import ChatsApi from "../api/chats.api";
import queryString from "../utils/queryString";
import Store from '../store/store';
import { IUserInfoDto } from "../types/IUserInfoDto";
import { INullable } from "../utils/INullable";
import ChatUsersApi from "../api/chatUsers.api";
import ChatTokenApi from "../api/chatToken.api";
import UserInfoController from "./userInfoController";
import NeedArray from "../utils/needArray";
import { IMessageProps } from "../component/message";

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
    public CurrentSocket: WebSocket;

    protected ping: number;

    protected readonly chatTokenApi = new ChatTokenApi();

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

    public async SendMessage(message: string): Promise<void> {
        this.CurrentSocket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
    }

    public async ConnectToChat(id: number): Promise<void> {
        const token = await this.GetChatToken(id);
        const userId = (await UserInfoController.GetUserInfo(false))?.id;
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`); 

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            })); 

            this.ping = setInterval(() => {
                this.CurrentSocket.send(JSON.stringify({ type: 'ping' }));
            }, 10000);
          });
          
          socket.addEventListener('close', event => {
            Store.set('messages', []);
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }
          
            if(this.ping) {
                clearInterval(this.ping);
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
          });
          
          socket.addEventListener('message', event => {
            const { messages = [] } = Store.getState<ReadonlyArray<IMessageProps>>();

            try {
                const data = JSON.parse(event.data);

                if(data.type === "pong") {
                    return;
                }

                const uniqueMessages = [...new Map([...messages, ...NeedArray(JSON.parse(event.data))].map(item => [item.id, item])).values()];

                Store.set(
                    'messages',
                    uniqueMessages
                        .filter(({id}) => Boolean(id))
                        .sort((a, b) => new Date(a.time) < new Date(b.time) ? 1 : -1)
                        .reverse()
                );
            } catch (e) {
                console.error(e);
            }
          });
          
          socket.addEventListener('error', event => {
            console.log('Ошибка', event);
          }); 

          this.CurrentSocket = socket;
    }

    public async GetChatToken(id: number): Promise<string | void> {
        const [result, error] = await this.chatTokenApi.create<{token: string}>(id);
        if (!error && result != null) {
            return result.token;
        }

        return console.warn(error);
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

    public async RemoveChat(chatId?: number): Promise<void> {
        const [, error] = await this.chatsApi.delete(JSON.stringify({chatId}));
        if (!error) {
            const chats = Store.getState<ReadonlyArray<IChatDto>>()?.chats;
            Store.set('chats', chats.filter(({id}) => id !== chatId));
            this.setCurrentChatId(null);
            return;
        }
        console.warn(error);
    }

    public IsChatCurrent(id: number | null): boolean {
        return id === Store.getState<number | null>()?.currentChatId;
    }

    public setCurrentChatId(id: number | null) {
        if(this.IsChatCurrent(id)) {
            return;
        }
        this.CurrentSocket?.close();
        Store.set('currentChatId', id);
    }

    public getCurrentChatId(): number | null {
        return Store.getState<number | null>()?.currentChatId;
    }
}

export default new ChatsController();
