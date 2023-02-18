import ATable from "./absc";


export interface ILoginTable extends ATable{
    get(): Promise<LoginDataType | null>;
    set(data: LoginDataType): Promise<boolean>;
    remove(): Promise<void>;
}

export type HostType = "stardusts" | "kakao" | "naver" | "google";

export type LoginDataType = {
    host: HostType;
    userId: string;
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
}