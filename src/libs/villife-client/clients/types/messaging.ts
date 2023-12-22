namespace VillifeMessaging {
    export interface Client {
        sendMessage(params: MessageForm): Promise<boolean>;
    }

    export type MessageForm = {
        buildingId: number;
        content: string;
        roomNumber: number;
        title: string;
    };
}

export default VillifeMessaging;
