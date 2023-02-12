import KakaoLoginManager from "./social/kakao";
import StardustsLoginManager from "./social/stardusts";

export default interface ILoginManager {
    stardusts: StardustsLoginManager;
    kakao: KakaoLoginManager;
}


export interface IKakaoLoginManager {
    login(): Promise<any>;
    logout(): Promise<any>;
    refresh(): Promise<any>;
}