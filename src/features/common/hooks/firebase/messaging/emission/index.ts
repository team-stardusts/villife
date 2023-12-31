import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import { MessagingEvent, MessagingEventData } from "../types";
import FirebaseMessagingEventHandler from "../event";
import { useEffect } from "react";
import { IEventEmittable } from "../../../../global_interface";

export default function useFirebaseMessagingEmitter() {
    const emitter: IEventEmittable<MessagingEvent, MessagingEventData> = new FirebaseMessagingEventHandler();

    useEffect(() => {
        messaging().onMessage(async (message: FirebaseMessagingTypes.RemoteMessage) => {
            /* if (!message.category ||  !message.notification) return;
            else if (!emitter.events.find((event) => event === message.category)) return; */

            if (!message.notification) return;

            let category: MessagingEvent | null = null;
            /* Test code */
            switch (message.notification.title) {
                case "차량 주차 알림":
                    category = "vehicle-parking-notification";
                    break;
                case "차량 등록 요청 결과":
                    category = "vehicle-registration-approval-notification";
                    break;
                case "승인 완료":
                    if (message.notification.body === "거주 승인이 완료 되었습니다, 정상적으로 앱을 이용하시면 됩니다.")
                        category = "residence-approved";
                    break;
                case "관리비 입금 확인 알림":
                    category = "management-fee-deposit-confirmation";
                    break;
                case "관리비 입금 확인 요청":
                    if (
                        message.notification.body ===
                        "관리비 입금 확인이 거절 되었습니다.\n관리비 입금액,입금자명을 다시 확인해주세요."
                    ) {
                        category = "management-fee-deposit-confirmation-refused";
                    }
                    break;
            }

            console.log("[PUSH_NOTI]", category, message.notification.title);
            if (category !== null) {
                emitter.emit(category as MessagingEvent, message.notification);
                return;
            }
            /* End of Test code */

            Alert.alert(message.notification?.title || "", message?.notification?.body || "");
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log("Message handled in the background!", remoteMessage);
        });
    }, []);
}
