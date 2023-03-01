import NaverLoginManager from "./social/naver";
import StardustsLoginManager from "./stardusts";
import ILoginManagers from "./types";

class LoginManagers implements ILoginManagers {
    stardusts: StardustsLoginManager = new StardustsLoginManager();
    naver: NaverLoginManager = new NaverLoginManager();
}

export default LoginManagers;