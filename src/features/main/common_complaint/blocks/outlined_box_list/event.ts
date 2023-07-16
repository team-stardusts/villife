import { EventRegister } from "react-native-event-listeners";

const NoticeEvents = {
    listUpdated: "event_list_updated",
};
Object.freeze(NoticeEvents);

export class NoticeEventEmitter {
    constructor() {}

    emitListUpdatedEvent() {
        EventRegister.emit(NoticeEvents.listUpdated);
    }
}
type EventCallback = (data: any) => void;

interface NoticeEventListener {
    subscribe(eventCallback: EventCallback): void;
    unsubscribe(): void;
}
export class NoticeListUpatedEventListener implements NoticeEventListener {
    private eventName = NoticeEvents.listUpdated;
    private listenerID: string = "";

    subscribe(eventCallback: EventCallback): void {
        const id = EventRegister.addEventListener(this.eventName, eventCallback);
        if (typeof id == "string") this.listenerID = id;
        else console.log("Event ID is returend as boolean, should check subscribe method");
    }
    unsubscribe(): void {
        EventRegister.removeEventListener(this.listenerID);
    }
}
