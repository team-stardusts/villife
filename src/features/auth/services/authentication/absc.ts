import VillifeServer from "../../../../libs/rest_apis/villife";
import IVillifeAuthManager from "../../../../libs/rest_apis/villife/auth/types";
import { ILoginManager, LoginServiceResult } from "./types";

abstract class ALoginManager implements ILoginManager {
    protected _api: IVillifeAuthManager = VillifeServer.getAuthenticator();

    abstract login(params: any): Promise<LoginServiceResult | null>;
    abstract join(params: any): Promise<any>;
}

export default ALoginManager;
