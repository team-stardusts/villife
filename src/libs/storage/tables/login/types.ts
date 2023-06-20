import { HostType as VillifeHostType } from "../../../rest_apis/villife/auth/types";
import { ITableUsable } from "../types";

export interface ILoginTable extends ITableUsable<LoginTableKey, LoginDataType> {}

export type HostType = VillifeHostType;

export type LoginTableKey = "login";

export type LoginDataType = {
    host: HostType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number; // Milliseconds / UTC + 0
};
