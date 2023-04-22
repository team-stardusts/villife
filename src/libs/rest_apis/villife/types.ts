import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Requestable, Responsable, Response } from "../types";
import { ContentPriority } from "../../../components/blocks/noti_screens/box_label.tsx/type";

export default interface IVillifeRESTAPI extends Requestable {
    login(id: string, password: string): Response<any>;
    requestWithAuthentication<T = any, U = any>(config: AxiosRequestConfig<T>): Promise<Responsable<U>>;

    socialLogin(category: SocialLoginHostType, accessToken: string): Response<LoginResult>;
    join(): Response<any>;
    socialJoin(category: SocialLoginHostType, params: SocialJoinParamsType): Response<SocialJoinResultType>;
    refresh(params: RefreshParmas): Response<RefreshResult>;
}

export type LoginResult = {
    access_token: string;
    expire_at: number;
    refresh_token: string;
}; // | "cannot find user" | undefined;

export type SocialLoginHostType = "naver";

export type SocialJoinResultType = "sign up has been done successfully" | "cannot find user" | "duplicate user";

export type Authority = {
    RENTER: 1;
    LANDLORD: 2;
    ADMIN: 3;
    SITE_ADMIN: 777;
};

export type SocialJoinParamsType = {
    id: string;
    password: string;
    access_token: string;
    authority: Authority[keyof Authority];
    //phone_number: string;
};

export type RegisterFirebaseTokenParams = {
    accessToken: string;
    refreshToken: string;
    firebaseToken: string;
};

export type RegisterFirebaseTokenResult =
    | "insert AccessToken to header and check format of request"
    | "input token to parameter"
    | "invalid token"
    | "server internal error";
//export type StardustsReturnType<T> = Promise<StardustsResultType<T>>;

export type RefreshParmas = {
    expiredAccessToken: string;
    refreshToken: string;
};

export type RefreshResult = {
    access_token: string;
    expire_at: number;
};

export type MediaUploadResult = {
    file_name: string;
    uri: string;
};

export type CreateNoticeParams = {
    priority: ContentPriority;
    title: string;
    content: string;
    building_id: number;
};
export type UpdateNoticeParams = {
    priority: ContentPriority;
    title: string;
    content: string;
    building_id: number;
    notice_id: number;
};
export type DeleteNoticeParams = {
    building_id: number;
    notice_id: number;
};

export type Notice = {
    ID: number;
    Priority: ContentPriority;
    Title: string;
    Content: string;
    CreatedAt: string;
    UpdatedAt: string;
};

export type GetNoticesResult = Array<Notice>;
