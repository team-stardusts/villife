import { EventRegister } from "react-native-event-listeners";
import { VillifeStorageEvents } from "../..";
import ATable from "../absc";
import { IUserTable, UserTableKey, UserDataType } from "./types";

class UserTable extends ATable implements IUserTable {
    readonly key: UserTableKey = "user";

    public async get(): Promise<UserDataType | null> {
        const result = await this.storage.getItem(this.key);

        EventRegister.emit(VillifeStorageEvents.user.GET_LOGIN_VALUE, result);

        return result;
    }

    public async set(data: UserDataType | null): Promise<boolean> {
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
