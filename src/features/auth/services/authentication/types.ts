import { Responsable, Response } from "../../../../libs/rest_apis/types";
import { HostType } from "../../../../libs/rest_apis/villife/auth/types";
import { SocialJoinResultType } from "../../../../libs/rest_apis/villife/auth/types";
import { LoginResult as VillifeLoginResult } from "../../../../libs/rest_apis/villife/auth/types";
import { Authority } from "../../../../libs/rest_apis/villife/types";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";

export interface IAuthServiceProvider extends UserInfoRefreshable {
    login(host: HostType, params?: LoginServiceParams | undefined): Promise<LoginResult>;
    join(host: HostType, params: JoinServiceParams | any): Response<SocialJoinResultType | any>;
    refreshUserInfo(): Promise<boolean>;
}

export interface ILoginManager extends Verifiable, Joinable {}

export interface Verifiable {
    login(params: any): Promise<LoginServiceResult | null>;
}

export interface Joinable {
    join(params: any): Promise<any>;
}

export interface UserInfoRefreshable {
    refreshUserInfo(): Promise<boolean>;
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

export type LoginResult = {
    loginData: LoginDataType | null;
    socialAccessToken?: string;
};

/* export type AuthServicesReturn = {
    login(host: HostType, params: LoginServiceParams | undefined): Promise<void>;
    join(host: HostType, params: JoinServiceParams | undefined): Response<SocialJoinResultType>;
}; */
