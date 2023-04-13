import VillifeServer from "../../../libs/rest_apis/villife";
import { ILoginManager, LoginServiceResult } from "./types";

abstract class ALoginManager implements ILoginManager {
    villife: VillifeServer = new VillifeServer();
    // [TO-DO] : Check duplicate ID.

    abstract login(params: any): Promise<LoginServiceResult>;
    abstract logout(): Promise<boolean>;
    abstract refresh(): Promise<any>;
    abstract join(params: any): Promise<any>;
}

export default ALoginManager;
