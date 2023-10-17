export interface IEventListenable<TEventName, TEventData> {
    listen(eventName: TEventName, callback: (eventName: TEventName, eventData: TEventData) => void): void;
    listenAllEvents(callback: (eventName: TEventName, eventData: TEventData) => void): void;
    removeAllListeners(): void;
}

export interface IEventEmittable<TEventName, TEventData> {
    events: TEventName[];
    emit(eventName: TEventName, eventData: TEventData): void;
}

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never;
