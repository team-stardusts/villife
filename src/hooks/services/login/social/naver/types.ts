import { Responsable } from "../../../../../libs/rest_apis/types";
import { SocialJoinParamsType, SocialLoginResultType } from "../../../../../libs/rest_apis/villife/types";

export default interface INaverLoginManager {
    login(): Promise<NaverLoginResultType>;
    join(params: NaverJoinParams): Promise<any>;
}

export type NaverLoginResultType = Responsable<SocialLoginResultType> & {
    socailAccessToken: string;
};

export type NaverJoinParams = SocialJoinParamsType;
