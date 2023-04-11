import { Responsable } from "../../../../../libs/rest_apis/types";
import { SocialJoinParamsType, LoginResult } from "../../../../../libs/rest_apis/villife/types";

export default interface INaverLoginManager {
    login(params: void): Promise<NaverLoginResultType>;
    join(params: NaverJoinParams): Promise<any>;
}

export type NaverLoginResultType = Responsable<LoginResult> & {
    sociallAccessToken: string;
};

export type NaverJoinParams = SocialJoinParamsType;
