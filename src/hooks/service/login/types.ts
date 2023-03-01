import type NaverLoginManager from "./social/naver";
import type StardustsLoginManager from "./stardusts";

export default interface ILoginManagers {
    stardusts: StardustsLoginManager;
    naver: NaverLoginManager;
}

export interface ILoginable {
    login(): Promise<any>;
    logout(): Promise<any>;
    refresh(): Promise<any>;
}