import { Authority } from "../../../rest_apis/villife/types";
export default interface ILoginTable {
    readonly key: LoginTableKey;

    get(): Promise<LoginDataType | null>;
    set(data: LoginDataType | null): Promise<boolean>;
    remove(): Promise<void>;
}

export type HostType = "villife" | "naver"; //| "kakao"  | "google";

export type LoginTableKey = "login" | "user";

export type LoginDataType = {
    host: HostType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number; // Milliseconds / UTC + 0
};

//USER TABLE

export interface IUserTable {
    readonly key: LoginTableKey;

    get(): Promise<UserDataType | null>;
    set(data: UserDataType | null): Promise<boolean>;
    remove(): Promise<void>;
}
export type UserDataType = {
    name: string;
    authority: Authority[keyof Authority];
    room_id: number | undefined;
    building_id: number | undefined;
};
