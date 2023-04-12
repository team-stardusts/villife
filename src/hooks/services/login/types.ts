import { Response } from "../../../libs/rest_apis/types";
import VillifeServer from "../../../libs/rest_apis/villife";
import type NaverLoginManager from "./social/naver";
import type VillifeLoginManager from "./villife";

export default interface ILoginManagers {
    villife: VillifeLoginManager;
    naver: NaverLoginManager;
}

export interface Verifiable {
    login(params: any): Response<any>;
    logout(): Promise<any>;
    refresh(): Promise<any>;
}

export interface Joinable {
    join(params: any): Promise<any>;
}

export interface ILoginManager extends Verifiable, Joinable {
    villife: VillifeServer;
}
