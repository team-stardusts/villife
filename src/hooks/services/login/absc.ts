import StardustsRestAPI from "../../../libs/rest_apis/stardusts";
import { ILoginable } from "./types";

abstract class ALoginManager implements ILoginable {
    server: StardustsRestAPI = new StardustsRestAPI();

    abstract login(): Promise<any>;
    abstract logout(): Promise<any>;
    abstract refresh(): Promise<any>;
}

export default ALoginManager;