import { Response } from "../../types";

export interface MessageSendable {
    sendPushMessage(messageData: MessageData): Response<string>;
}

export type MessageData = {
    building_id: number;
    content: string;
    room_number: number;
    title: string;
};

export default interface IVillifeMessageRestClient extends MessageSendable {}
