import { HostType as VillifeHostType } from "../../../rest_apis/villife/auth/types";

export default interface ILoginTable {
    readonly key: LoginTableKey;

    get(): Promise<LoginDataType | null>;
    set(data: LoginDataType | null): Promise<boolean>;
    remove(): Promise<void>;
}

export type HostType = VillifeHostType;

export type LoginTableKey = "login";

export type LoginDataType = {
    host: HostType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number; // Milliseconds / UTC + 0
};
