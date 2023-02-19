import type NaverLoginManager from "./social/naver";
import type StardustsLoginManager from "./social/stardusts";

export default interface ILoginManagers {
    stardusts: StardustsLoginManager;
    naver: NaverLoginManager;
}

export interface ILoginManager {
    login(): Promise<any>;
    logout(): Promise<any>;
    refresh(): Promise<any>;
}

export interface IKakaoLoginManager {
    login(): Promise<any>;
    logout(): Promise<any>;
    refresh(): Promise<any>;
}

export interface INaverLoginManager {
    login(): Promise<any>;
    logout(): Promise<any>;
    refresh(): Promise<any>;
}