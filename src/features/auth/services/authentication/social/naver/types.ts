import { Response } from "../../../../../../libs/rest_apis/types";
import { LoginResult, SocialJoinParamsType } from "../../../../../../libs/rest_apis/villife/auth/types";

export default interface INaverLoginManager {
    login(params: void): Response<LoginResult>;
    join(params: NaverJoinParams): Promise<any>;
}

export type NaverJoinParams = SocialJoinParamsType;
