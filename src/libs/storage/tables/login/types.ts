import { HostType as VillifeHostType } from "../../../rest_apis/villife/auth/types";
import { TableUsable } from "../types";
import { UserDataType } from "../user/types";

export type HostType = VillifeHostType;

export type LoginTableKey = "login";

export type LoginDataType = UserDataType & {
    host: HostType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number; // Milliseconds / UTC + 0
};
