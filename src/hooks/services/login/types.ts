import type NaverLoginManager from "./social/naver";
import type VillifeLoginManager from "./villife";

export default interface ILoginManagers {
    villife: VillifeLoginManager;
    naver: NaverLoginManager;
}

export interface Loginable {
    login(): Promise<any>;
    logout(): Promise<any>;
    refresh(): Promise<any>;
}