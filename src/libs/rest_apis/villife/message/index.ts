import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeMessageRestClient, { MessageData } from "./types";

export default class VillifeMessageRestClient extends AVillifeServerModule implements IVillifeMessageRestClient {
    public async sendPushMessage(messageData: MessageData): Response<MessageData> {
        let route: string = this.routes.message.sendMessage;

        return await this.requestAuthable<any, MessageData>({
            method: "post",
            url: route,
            data: messageData,
        });
    }
}
