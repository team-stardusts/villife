import { Response } from "../../../../../../libs/rest_apis/types";
import { SocialJoinParamsType, LoginResult } from "../../../../../../libs/rest_apis/villife/types";

export default interface INaverLoginManager {
    login(params: void): Response<LoginResult>;
    join(params: NaverJoinParams): Promise<any>;
}

export type NaverJoinParams = SocialJoinParamsType;
