import { AxiosRequestConfig } from "axios";
import { Requestable, Response } from "../types";


export default interface IVillifeRESTAPI extends Requestable {
    login(id: string, password: string): Response<any>;
    socialLogin(category: SocialLoginHostType, accessToken: string): 
        Response<CustomSocialLoginResultType>;
    join(): Response<any>;
    socialJoin(category: SocialLoginHostType, params: SocialJoinParamsType): Response<SocialJoinResultType>;
}


export type SocialLoginHostType = "naver";

export type SocialLoginResultType = {
    access_token: string;
    expire_at: number;
    refresh_token: string;
} // | "cannot find user" | undefined;

export type CustomSocialLoginResultType = {
    social: {
        access_token: string;
    };
    villife: SocialLoginResultType;
}

export type SocialJoinResultType = 
    "sign up has been done successfully" 
    | "cannot find user"
    | "duplicate user";

export type SocialJoinParamsType = {
    id: string;
    password: string;
    access_token: string;
    //phone_number: string;
}
//export type StardustsReturnType<T> = Promise<StardustsResultType<T>>;