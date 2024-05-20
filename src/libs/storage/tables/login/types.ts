import { Villife } from "@team-stardusts/villife-client";
import { HostType as VillifeHostType } from "../../../rest_apis/villife/auth/types";

export type HostType = VillifeHostType;

export type LoginTableKey = "login";

export type LoginDataType = Villife.User.User & {
    host: HostType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number; // Milliseconds / UTC + 0
};
