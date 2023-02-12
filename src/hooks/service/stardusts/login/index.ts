import KakaoLoginManager from "./social/kakao";
import NaverLoginManager from "./social/naver";
import StardustsLoginManager from "./social/stardusts";
import ILoginManagers from "./types";

class LoginManager implements ILoginManagers{
    stardusts: StardustsLoginManager = new StardustsLoginManager();
    kakao: KakaoLoginManager = new KakaoLoginManager();
    naver: NaverLoginManager = new NaverLoginManager();
}

export default LoginManager;