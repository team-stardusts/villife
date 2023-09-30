export type MessagingEvent = "new-noti-registration" | "new-complaint-registration";
/* | "double-parking"
| "change-request" */

export type MessagingEventData = any;

export interface IEventListenable<TEventName, TEventData> {
    listen(eventName: TEventName, callback: (eventName: TEventName, eventData: TEventData) => void): void;
    listenAllEvents(callback: (eventName: TEventName, eventData: TEventData) => void): void;
    removeAllListeners(): void;
}

export interface IEventEmittable<TEventName, TEventData> {
    events: TEventName[];
    emit(eventName: TEventName, eventData: TEventData): void;
}
