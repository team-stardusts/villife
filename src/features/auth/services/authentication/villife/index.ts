import { LoginServiceParams, LoginServiceResult } from "../types";
import ALoginManager from "../absc";
import IVillifeLoginManager from "./types";

class VillifeLoginManager extends ALoginManager implements IVillifeLoginManager {
    public async login(params: LoginServiceParams): Promise<LoginServiceResult> {
        return (await this._api.login(params.id, params.password)) as LoginServiceResult;
    }

    public async logout(): Promise<boolean> {
        return await this._api.logout();
    }

    public async refresh(): Promise<any> {}

    public async join(): Promise<any> {}
}

export default VillifeLoginManager;
