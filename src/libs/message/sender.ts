import { Response } from "../rest_apis/types";
import VillifeServer from "../rest_apis/villife";
import { MessageData } from "../rest_apis/villife/message/types";

export interface IMessageSender {
    sendMessage(params: MessageData): Promise<Response<MessageData>>;
}

export default class PushMessageSender implements IMessageSender {
    private _messageAPI = VillifeServer.getMessageRestClient();

    async sendMessage(params: MessageData): Promise<Response<MessageData>> {
        const result = await this._messageAPI.sendPushMessage(params);

        return result;
    }
}
