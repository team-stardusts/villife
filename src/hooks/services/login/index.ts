import NaverLoginManager from "./social/naver";
import VillifeLoginManager from "./villife";
import ILoginManagers from "./types";

class LoginManagers implements ILoginManagers {
    villife: VillifeLoginManager = new VillifeLoginManager();
    naver: NaverLoginManager = new NaverLoginManager();
}

export default LoginManagers;