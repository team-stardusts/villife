namespace VillifeMessaging {
    export interface Client {
        sendMessage(params: MessageForm): Promise<boolean>;
        getPushMessageLogs(): Promise<PushMessageLog[]>;
    }

    export type MessageForm = {
        buildingId: number;
        content: string;
        roomNumber: number;
        title: string;
    };

    export type PushMessageLog = {
        content: string;
        createdAt: number;
        id: number;
        intent: string;
        senderBuildingId: number;
        senderBuildingName: string;
        title: string;
    };
}

export default VillifeMessaging;
