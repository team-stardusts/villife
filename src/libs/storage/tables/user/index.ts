import { EventRegister } from "react-native-event-listeners";
import { VillifeStorageEvents } from "../..";
import LocalStorage from "../../localstorage";
import ATable from "../absc";
import ILoginTable, { LoginDataType, LoginTableKey } from "./types";

class UserTable extends ATable implements ILoginTable {
    readonly key: LoginTableKey = "user";

    public async get(): Promise<LoginDataType | null> {
        const result = await this.storage.getItem(this.key);

        EventRegister.emit(VillifeStorageEvents.user.GET_LOGIN_VALUE, result);

        return result;
    }

    public async set(data: LoginDataType | null): Promise<boolean> {
        const result = await this.storage.setItem(this.key, data);

        EventRegister.emit(VillifeStorageEvents.user.CHANGE_LOGIN_VALUE, data);

        return result;
    }

    public async remove(): Promise<void> {
        await this.storage.removeItem(this.key);

        EventRegister.emit(VillifeStorageEvents.user.REMOVE_LOGIN_VALUE);
    }
}

export default UserTable;
