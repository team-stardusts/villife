import { ILoginManager } from "./types";

abstract class ALoginManager implements ILoginManager {
    abstract login(): Promise<any>;
    abstract logout(): Promise<any>;
    abstract refresh(): Promise<any>;
}

export default ALoginManager;