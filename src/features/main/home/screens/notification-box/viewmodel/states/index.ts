import { atom } from "recoil";
import { PushMessageLog } from "../types";

export const notificationBoxState = atom<PushMessageLog[]>({
    key: "notification_box_state",
    default: [],
});

export const latestNotificationIdState = atom<number>({
    key: "latest_notification_id_state",
    default: 0,
});
