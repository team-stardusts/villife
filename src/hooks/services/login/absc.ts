import VillifeServer from "../../../libs/rest_apis/villife";
import { Loginable } from "./types";

abstract class ALoginManager implements Loginable {
    villife: VillifeServer = new VillifeServer();
    // [TO-DO] : Check duplicate ID.

    abstract login(params: any): Promise<any>;
    abstract logout(): Promise<any>;
    abstract refresh(): Promise<any>;
    //abstract join(): Promise<any>;
    abstract join(id: string, password: string, accessToken: string,atuhority : number): Promise<any>;
}

export default ALoginManager;