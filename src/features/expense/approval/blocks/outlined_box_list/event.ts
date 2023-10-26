import { EventRegister } from "react-native-event-listeners";

const ExpenseApprovalEvents = {
    listUpdated: "event_list_updated",
};
Object.freeze(ExpenseApprovalEvents);

export class ApprovalEventEmitter {
    constructor() {}

    emitListUpdatedEvent() {
        EventRegister.emit(ExpenseApprovalEvents.listUpdated);
    }
}
type EventCallback = (data: any) => void;

interface ExpenseApprovalEventListener {
    subscribe(eventCallback: EventCallback): void;
    unsubscribe(): void;
}
export class ApprovalListUpatedEventListener implements ExpenseApprovalEventListener {
    private eventName = ExpenseApprovalEvents.listUpdated;
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
