import { EventRegister } from "react-native-event-listeners";
import { VillifeStorageEvents } from "../..";
import TableCommon from "../absc";
import { IUserTable, UserTableKey } from "./types";
import Villife from "../../../villife-client/types";

class UserTable extends TableCommon implements IUserTable {
    readonly key: UserTableKey = "user";

    public async get(): Promise<Villife.User.User | null> {
        const result = await this.storage.getItem(this.key);

        EventRegister.emit(VillifeStorageEvents.user.GET_LOGIN_VALUE, result);

        return result;
    }

    public async set(data: Villife.User.User | null): Promise<boolean> {
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
