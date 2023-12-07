import DotEnv from "../dotenv";
import VillifeClient from "../villife-client";
import Villife from "../villife-client/types";
import VillifeSessionAdaptor from "./session";

const env = new DotEnv();

class VillifeNativeClient extends VillifeClient implements Villife.IntegratedInstance {
    constructor() {
        super(env.api.villife.REST_API_BASE_URL ?? "", new VillifeSessionAdaptor());
    }
}

export default VillifeNativeClient;
