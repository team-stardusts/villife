import Villife from "../../../libs/rest_apis/villife";
import { ILoginable } from "./types";

abstract class ALoginManager implements ILoginable {
    server: Villife = new Villife();

    abstract login(): Promise<any>;
    abstract logout(): Promise<any>;
    abstract refresh(): Promise<any>;
}

export default ALoginManager;