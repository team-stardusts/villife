import { atom } from "recoil";
import { PushMessageLog } from "../types";

export const notificationBoxState = atom<PushMessageLog[]>({
    key: "notification_box_state",
    default: [],
});
