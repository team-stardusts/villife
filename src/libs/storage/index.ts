import { EventRegister } from "react-native-event-listeners";
import LoginTable from "./tables/login";
import IVillifeStorage, {
    EventRegisterable,
    StorageListenerCallback,
    VillifeStorageEvent,
    VillifeStorageEvents as _VillifeStorageEvents,
} from "./types";
import UserTable from "./tables/user";

export const VillifeStorageEvents: _VillifeStorageEvents = {
    login: {
        GET_LOGIN_VALUE: "GET_LOGIN_VALUE",
        CHANGE_LOGIN_VALUE: "CHANGE_LOGIN_VALUE",
        REMOVE_LOGIN_VALUE: "REMOVE_LOGIN_VALUE",
    },
    user: {
        GET_USER_VALUE: "GET_USER_VALUE",
        CHANGE_USER_VALUE: "CHANGE_USER_VALUE",
        REMOVE_USER_VALUE: "REMOVE_USER_VALUE",
    },
};

class VillifeStorage implements IVillifeStorage, EventRegisterable {
    private static _instance: VillifeStorage | null = null;

    private constructor() {}

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    login = new LoginTable();
    user = new UserTable();

    public addEventListener(key: VillifeStorageEvent, callback: StorageListenerCallback): void {
        EventRegister.addEventListener(key, callback);
    }

    public removeEventListener(key: VillifeStorageEvent): boolean {
        return EventRegister.removeEventListener(key);
    }
}

export default VillifeStorage;
