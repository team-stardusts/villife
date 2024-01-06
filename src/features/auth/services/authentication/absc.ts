import VillifeNativeClient from "../../../../libs/villife-native-client";
import { ILoginManager, LoginServiceResult } from "./types";

abstract class ALoginManager implements ILoginManager {
    protected _api = new VillifeNativeClient().auth;

    abstract login(params: any): Promise<LoginServiceResult | null>;
    abstract join(params: any): Promise<any>;
}

export default ALoginManager;
