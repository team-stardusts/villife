import LocalStorage from "../../../native/localstorage";
import ATable from "./absc";
import { ILoginTable, LoginData } from "./types"

class LoginTable extends ATable implements ILoginTable{
    readonly key: string = "login";

    public async get(): Promise<LoginData | null> {
        return await this.storage.getItem(this.key);
    }

    public async set(data: LoginData): Promise<boolean> {
        return await this.storage.setItem(this.key, data);
    }

    public async remove(): Promise<void> {
        return await this.storage.removeItem(this.key);
    }
}

export default LoginTable;