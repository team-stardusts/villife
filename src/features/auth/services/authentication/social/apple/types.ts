import { Response } from "../../../../../../libs/rest_apis/types";
import { LoginResult, SocialJoinParamsType } from "../../../../../../libs/rest_apis/villife/auth/types";

export default interface AppleLoginBase {
    login(params: void): Response<LoginResult>;
    join(params: void): Promise<void>;
}

export type NaverJoinParams = SocialJoinParamsType;
