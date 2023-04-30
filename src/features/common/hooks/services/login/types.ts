import { Responsable } from "../../../../../libs/rest_apis/types";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { LoginResult as VillifeLoginResult } from "../../../../../libs/rest_apis/villife/types";
import { HostType } from "../../../../../libs/storage/tables/login/types";
import type NaverLoginManager from "./social/naver";
import type VillifeLoginManager from "./villife";

export default interface ILoginManagers {
    villife: VillifeLoginManager;
    naver: NaverLoginManager;
}

export interface Verifiable {
    login(params: any): Promise<LoginServiceResult>;
    logout(): Promise<boolean>;
}

export interface Joinable {
    join(params: any): Promise<any>;
}

export interface ILoginManager extends Verifiable, Joinable {
    villife: VillifeServer;
}

export type LoginServiceResult = Responsable<VillifeLoginResult> & {
    socialAccessToken?: string;
};

export type LoginServiceParams = {
    id: string;
    password: string;
};

export type AuthServicesReturn = {
    login(host: HostType, params: LoginServiceParams | undefined): Promise<LoginServiceResult>;
    logout(): Promise<void>;
};
