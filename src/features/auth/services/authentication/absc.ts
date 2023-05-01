import VillifeAuthenticator from "../../../../libs/rest_apis/villife/auth";
import { ILoginManager, LoginServiceResult } from "./types";

abstract class ALoginManager implements ILoginManager {
    villife: VillifeAuthenticator = new VillifeAuthenticator();
    // [TO-DO] : Check duplicate ID.

    abstract login(params: any): Promise<LoginServiceResult>;
    abstract join(params: any): Promise<any>;
}

export default ALoginManager;
