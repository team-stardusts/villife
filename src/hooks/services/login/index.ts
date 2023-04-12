import NaverLoginManager from "./social/naver";
import VillifeLoginManager from "./villife";
import ILoginManagers, { ILoginManager } from "./types";
import { HostType } from "../../storage/tables/login/types";

class LoginManagers implements ILoginManagers {
    villife: VillifeLoginManager = new VillifeLoginManager();
    naver: NaverLoginManager = new NaverLoginManager();
}

export default LoginManagers;

export class LoginManagerProvider {
    static getLoginManager(host: HostType): ILoginManager {
        switch (host) {
            case "naver":
                return new NaverLoginManager();
            default:
                return new VillifeLoginManager();
        }
    }
}
