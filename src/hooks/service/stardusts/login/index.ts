import KakaoLoginManager from "./social/kakao";
import StardustsLoginManager from "./social/stardusts";
import ILoginManager from "./types";

class LoginManager implements ILoginManager{
    stardusts: StardustsLoginManager = new StardustsLoginManager();
    kakao: KakaoLoginManager = new KakaoLoginManager();
}

export default LoginManager;