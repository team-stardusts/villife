import { Response } from "../../../../libs/rest_apis/types";
import { LoginResult } from "../../../../libs/rest_apis/villife/types";
import ALoginManager from "../absc";
import { LoginParams } from "./type";

class VillifeLoginManager extends ALoginManager {
    public async login(params: LoginParams): Response<LoginResult> {
        return await this.villife.login(params.id, params.password);
    }
    public async logout(): Promise<boolean> {
        return await this.villife.logout();
    }
    public async refresh(): Promise<any> {}
    public async join(): Promise<any> {}
}

export default VillifeLoginManager;
