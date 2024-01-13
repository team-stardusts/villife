import VillifeClient, { Villife } from "@team-stardusts/villife-client";
import DotEnv from "../dotenv";
import VillifeSessionAdaptor from "./session";

const env = new DotEnv();

class VillifeNativeClient extends VillifeClient implements Villife.IntegratedInstance {
    constructor() {
        super(env.api.villife.REST_API_BASE_URL ?? "", new VillifeSessionAdaptor());
    }
}

export default VillifeNativeClient;
