import { Response, ResponseForTest } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeMessageRestClient, { MessageData } from "./types";

export default class VillifeMessageRestClient extends AVillifeServerModule implements IVillifeMessageRestClient {
    public async sendPushMessage(messageData: MessageData): Response<string> {
        let route: string = this.routes.message.sendPushMessage;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: messageData,
        });
    }
}
