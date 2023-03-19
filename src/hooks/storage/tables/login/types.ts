import ATable from "../absc";

export default interface ILoginTable extends ATable {
    readonly key: LoginTableKey;

    get(): Promise<LoginDataType | null>;
    set(data: LoginDataType): Promise<boolean>;
    remove(): Promise<void>;
}

export type HostType = "stardusts" | "kakao" | "naver" | "google";

export type LoginTableKey = "login";

export type LoginDataType = {
    host: HostType;
    userId: string;
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
}