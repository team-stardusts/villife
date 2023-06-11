export type Authority = {
    RENTER: 1; // 임차인
    OWNER: 2; // 임대인
    ADMIN: 3; // 관리인
    SITE_ADMIN: 777;
};

export type RefreshParmas = {
    expiredAccessToken: string;
    refreshToken: string;
};

export type RefreshResult = {
    access_token: string;
    expire_at: number;
};

export namespace TestNamespace {
    export type TestType = "";
}

/* export default interface IVillifeRESTAPI extends Requestable {
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

export type VerifyBuildingAddressParams = {
    address: string;
};
export type VerifyBuildingAddressResult = {
    building_id: number;
    building_name: string;
};

export type UserResidenceValidationParams = {
    building_id: number;
    room_number: number;
};

export type GetNoticesResult = Array<Notice>; */
