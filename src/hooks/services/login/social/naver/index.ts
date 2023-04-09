import { NaverLogin } from "@react-native-seoul/naver-login";
import { SocialJoinResultType } from "../../../../../libs/rest_apis/villife/types";
import { Response } from "../../../../../libs/rest_apis/types";
//import NaverLogin, {
//    GetProfileResponse,
//} from '@react-native-seoul/naver-login';

import ISystemInfo from "../../../../systeminfo";
import useSystemInfo from "../../../../systeminfo/hooks";
import ALoginManager from "../../absc";
import INaverLoginManager, { NaverJoinParams, NaverLoginResultType } from "./types";
import DotEnv from "../../../../../libs/dotenv";

class NaverLoginManager extends ALoginManager implements INaverLoginManager {
    systemInfo: ISystemInfo = useSystemInfo();
    private env: DotEnv = new DotEnv();

    public async login(): Promise<NaverLoginResultType> {
        const params = {
            kServiceAppName: this.env.app.NAME ?? "",
            kConsumerKey: this.env.api.naver.API_CONSUMER_KEY ?? "",
            kConsumerSecret: this.env.api.naver.API_CONSUMER_SECRET ?? "",
        };

        if (this.systemInfo.platform.OS === "ios") {
            Object.assign(params, { kServiceAppUrlScheme: this.env.api.naver.API_SERVISE_URL_SHEME ?? "" });
        }

        const naverLoginResult: any = await new Promise((resolve, reject) => {
            NaverLogin.login(params, (err, token) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
                return;
            });
        });

        // [TO-DO] NaverLogin 실패 상황 예외 처리 필요
        return await this.villife
            .socialLogin("naver", naverLoginResult.accessToken)
            .then((res) => Object.assign(res, { socailAccessToken: naverLoginResult.accessToken }));
    }

    public async logout(): Promise<any> {
        console.log("logout");
        NaverLogin.logout();
    }
    public async refresh(): Promise<any> {}

    public async join(params: NaverJoinParams): Response<SocialJoinResultType> {
        return await this.villife.socialJoin("naver", params);
    }
}

export default NaverLoginManager;
