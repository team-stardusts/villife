import { EventRegister } from "react-native-event-listeners";
import { Reply } from "./type";

const ComplaintEvents = {
    listUpdated: "event_list_updated",
    replyModification: "event_reply_modification",
};
Object.freeze(ComplaintEvents);

export class ComplaintEventEmitter {
    constructor() {}

    emitListUpdatedEvent() {
        EventRegister.emit(ComplaintEvents.listUpdated);
    }

    emitReplyModificationEvent(data: Reply) {
        EventRegister.emit(ComplaintEvents.replyModification, data);
    }
}
type EventCallback = (data: any) => void;
type ReplyModificationEventCallback = (data: Reply) => void;

interface ComplaintEventListener {
    subscribe(eventCallback: EventCallback): void;
    unsubscribe(): void;
}

export class ComplaintListUpatedEventListener implements ComplaintEventListener {
    private eventName = ComplaintEvents.listUpdated;
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

export class ComplaintReplyModificationEventListener implements ComplaintEventListener {
    private eventName = ComplaintEvents.replyModification;
    private listenerID: string = "";

    subscribe(eventCallback: ReplyModificationEventCallback): void {
        const id = EventRegister.addEventListener(this.eventName, eventCallback);
        if (typeof id == "string") this.listenerID = id;
        else console.log("Event ID is returend as boolean, should check subscribe method");
    }
    unsubscribe(): void {
        EventRegister.removeEventListener(this.listenerID);
    }
}
