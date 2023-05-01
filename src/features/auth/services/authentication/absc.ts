import VillifeServer from "../../../../libs/rest_apis/villife";
import IVillifeAuthManager from "../../../../libs/rest_apis/villife/auth/types";
import { ILoginManager, LoginServiceResult } from "./types";

abstract class ALoginManager implements ILoginManager {
    villife: IVillifeAuthManager = VillifeServer.getAuthenticator();
    // [TO-DO] : Check duplicate ID.

    abstract login(params: any): Promise<LoginServiceResult>;
    abstract join(params: any): Promise<any>;
}

export default ALoginManager;
