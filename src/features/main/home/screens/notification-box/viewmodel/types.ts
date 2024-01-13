import { Villife } from "@team-stardusts/villife-client";

export type PushMessageLog = {
    content: Villife.Messaging.PushMessageLog["content"];
    createdAt: Date;
    id: Villife.Messaging.PushMessageLog["id"];
    title: Villife.Messaging.PushMessageLog["title"];
};
