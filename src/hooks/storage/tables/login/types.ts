import ATable from "../absc";

export default interface ILoginTable extends ATable {
    readonly key: LoginTableKey;

    get(): Promise<LoginDataType | null>;
    set(data: LoginDataType | null): Promise<boolean>;
    remove(): Promise<void>;
}

export type HostType = "stardusts" | "kakao" | "naver" | "google";

export type LoginTableKey = "login";

export type LoginDataType = {
    host: HostType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number; // Milliseconds / UTC + 0
}