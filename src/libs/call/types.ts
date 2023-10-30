export interface TelephoneBase extends Callable, Messageable {}

export interface Callable {
    call(to: string): Promise<boolean>;
}

export interface Messageable {
    message(to: string): Promise<boolean>;
}
