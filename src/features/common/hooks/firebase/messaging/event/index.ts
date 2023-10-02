import { EventRegister } from "react-native-event-listeners";
import { MessagingEvent, MessagingEventData, IEventEmittable, IEventListenable } from "../types";

class FirebaseMessagingEventHandler
    implements
        IEventEmittable<MessagingEvent, MessagingEventData>,
        IEventListenable<MessagingEvent, MessagingEventData>
{
    public readonly events: MessagingEvent[] = [
        "new-complaint-registration",
        "new-noti-registration",
        "new-vehicle-registration",
        "vehicle-parking-notification",
        "vehicle-registration-approval-notification",
    ];

    public emit(eventName: MessagingEvent, eventData: MessagingEventData): void {
        EventRegister.emit(eventName as string, eventData);
    }

    public listen(
        eventName: MessagingEvent,
        callback: (eventName: MessagingEvent, eventData: MessagingEventData) => void
    ): void {
        EventRegister.addEventListener(eventName as string, (data: MessagingEventData) => callback(eventName, data));
    }

    public listenAllEvents(callback: (eventName: MessagingEvent, eventData: MessagingEventData) => void): void {
        this.events.forEach((_eventName) => {
            this.listen(_eventName, (name: MessagingEvent, data: MessagingEventData) => callback(name, data));
        });
    }

    public removeAllListeners(): void {
        this.events.forEach((_eventName) => {
            EventRegister.removeEventListener(_eventName);
        });
    }
}

export default FirebaseMessagingEventHandler;
