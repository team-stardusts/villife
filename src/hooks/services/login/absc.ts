import VillifeServer from "../../../libs/rest_apis/villife";
import { ILoginManager } from "./types";

abstract class ALoginManager implements ILoginManager {
    villife: VillifeServer = new VillifeServer();
    // [TO-DO] : Check duplicate ID.

    abstract login(params: any): Promise<any>;
    abstract logout(): Promise<any>;
    abstract refresh(): Promise<any>;
    abstract join(params: any): Promise<any>;
}

export default ALoginManager;
