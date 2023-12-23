import Villife from "../../../../../../libs/villife-client/types";

export type PushMessageLog = {
    content: Villife.Messaging.PushMessageLog["content"];
    createdAt: Date;
    id: Villife.Messaging.PushMessageLog["id"];
    title: Villife.Messaging.PushMessageLog["title"];
};
