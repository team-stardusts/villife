import LocalStorage from "../../../native/localstorage";
import ATable from "./absc";
import { ILoginTable, LoginDataType } from "./types"

class LoginTable extends ATable implements ILoginTable{
    readonly key: string = "login";

    public async get(): Promise<LoginDataType | null> {
        return await this.storage.getItem(this.key);
    }

    public async set(data: LoginDataType): Promise<boolean> {
        return await this.storage.setItem(this.key, data);
    }

    public async remove(): Promise<void> {
        return await this.storage.removeItem(this.key);
    }
}

export default LoginTable;