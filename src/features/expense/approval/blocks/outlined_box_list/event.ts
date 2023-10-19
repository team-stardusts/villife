import { EventRegister } from "react-native-event-listeners";

const ApprovalEvents = {
    listUpdated: "event_list_updated",
};
Object.freeze(ApprovalEvents);

export class ApprovalEventEmitter {
    constructor() {}

    emitListUpdatedEvent() {
        EventRegister.emit(ApprovalEvents.listUpdated);
    }
}
type EventCallback = (data: any) => void;

interface ApprovalEventListener {
    subscribe(eventCallback: EventCallback): void;
    unsubscribe(): void;
}
export class ApprovalListUpatedEventListener implements ApprovalEventListener {
    private eventName = ApprovalEvents.listUpdated;
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
