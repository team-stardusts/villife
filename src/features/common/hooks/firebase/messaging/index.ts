import messaging from "@react-native-firebase/messaging";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging/lib";
import { MessagingEvent, MessagingEventData, IEventEmittable } from "./types";
import FirebaseMessagingEventHandler from "./event";

export default function useFollowingFirebaseMessage() {
    const emitter: IEventEmittable<MessagingEvent, MessagingEventData> = new FirebaseMessagingEventHandler();

    messaging().onMessage(async (message: FirebaseMessagingTypes.RemoteMessage) => {
        if (!message.category || !message.notification) return;
        else if (!emitter.events.find((event) => event === message.category)) return;

        emitter.emit(message.category as MessagingEvent, message.notification);
    });

    messaging().setBackgroundMessageHandler(async (message) => {
        console.log("Message handled in the background!", message);
    });
}
