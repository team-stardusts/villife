import { Responsable, Response } from "../../../../libs/rest_apis/types";
import IVillifeAuthManager, { HostType } from "../../../../libs/rest_apis/villife/auth/types";
import { SocialJoinResultType } from "../../../../libs/rest_apis/villife/auth/types";
import { LoginResult as VillifeLoginResult } from "../../../../libs/rest_apis/villife/auth/types";
import { Authority } from "../../../../libs/rest_apis/villife/types";
import type NaverLoginManager from "./social/naver";
import type VillifeLoginManager from "./villife";

export default interface ILoginManagers {
    villife: VillifeLoginManager;
    naver: NaverLoginManager;
}

export interface Verifiable {
    login(params: any): Promise<LoginServiceResult>;
}

export interface Joinable {
    join(params: any): Promise<any>;
}

export interface ILoginManager extends Verifiable, Joinable {
    villife: IVillifeAuthManager;
}

export type LoginServiceResult = Responsable<VillifeLoginResult> & {
    socialAccessToken?: string;
};

export type LoginServiceParams = {
    id: string;
    password: string;
};

export type JoinServiceParams = {
    id: string;
    password: string;
    authority: Authority[keyof Authority];
    accessToken: string;
};

export type AuthServicesReturn = {
    login(host: HostType, params: LoginServiceParams | undefined): Promise<LoginServiceResult>;
    join(host: HostType, params: JoinServiceParams | undefined): Response<SocialJoinResultType>;
};
