import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export type MessagingEvent =
    | "new-noti-registration"
    | "new-complaint-registration"
    | "new-vehicle-registration"
    | "vehicle-parking-notification"
    | "vehicle-registration-approval-notification";
/* | "double-parking"
| "change-request" */

export type MessagingEventData = FirebaseMessagingTypes.NotificationPayload;

export interface IEventListenable<TEventName, TEventData> {
    listen(eventName: TEventName, callback: (eventName: TEventName, eventData: TEventData) => void): void;
    listenAllEvents(callback: (eventName: TEventName, eventData: TEventData) => void): void;
    removeAllListeners(): void;
}

export interface IEventEmittable<TEventName, TEventData> {
    events: TEventName[];
    emit(eventName: TEventName, eventData: TEventData): void;
}
