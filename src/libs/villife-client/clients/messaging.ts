import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifeMessagingClient extends VillifeClientCommon implements Villife.Messaging.Client {
    public async getPushMessageLogs(): Promise<Villife.Messaging.PushMessageLog[]> {
        return this.requestWithCredential({
            method: "get",
            url: this._routes.message.pushMessageLogs,
        });
    }

    public async sendMessage(params: Villife.Messaging.MessageForm): Promise<boolean> {
        return this.requestWithCredential({
            method: "post",
            url: this._routes.message.sendPushMessage,
            data: params,
        })
            .then(() => true)
            .catch(() => false);
    }
}

export default VillifeMessagingClient;
