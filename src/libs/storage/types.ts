import type LoginTable from "./tables/login";

export type StorageListenerCallback = (newValue: any) => void;

export type VillifeStorageEvent =
    | "GET_LOGIN_VALUE"
    | "CHANGE_LOGIN_VALUE"
    | "REMOVE_LOGIN_VALUE"
    | "GET_USER_VALUE"
    | "CHANGE_USER_VALUE"
    | "REMOVE_USER_VALUE";

export type VillifeStorageEvents = {
    login: {
        [key: string]: VillifeStorageEvent;
    };
    user: {
        [key: string]: VillifeStorageEvent;
    };
};

export interface EventRegisterable {
    addEventListener(key: VillifeStorageEvent, callback: StorageListenerCallback): void;
    removeEventListener(key: VillifeStorageEvent): boolean;
    //removeAllListeners(): boolean;
}

export default interface IVillifeStorage extends EventRegisterable {
    login: LoginTable;
}
