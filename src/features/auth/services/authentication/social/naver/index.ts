import { NaverLogin, TokenResponse } from "@react-native-seoul/naver-login";
import { SocialJoinResultType } from "../../../../../../libs/rest_apis/villife/auth/types";
import { Response } from "../../../../../../libs/rest_apis/types";
import ALoginManager from "../../absc";
import INaverLoginManager, { NaverJoinParams } from "./types";
import DotEnv from "../../../../../../libs/dotenv";
import { LoginServiceResult } from "../../types";
import { Platform } from "react-native";

class NaverLoginManager extends ALoginManager implements INaverLoginManager {
    private env: DotEnv = new DotEnv();

    public async login(params: void): Promise<LoginServiceResult> {
        const naverLoginParams = {
            kServiceAppName: this.env.app.NAME ?? "",
            kConsumerKey: this.env.api.naver.API_CONSUMER_KEY ?? "",
            kConsumerSecret: this.env.api.naver.API_CONSUMER_SECRET ?? "",
        };

        if (Platform.OS === "ios") {
            Object.assign(naverLoginParams, { kServiceAppUrlScheme: this.env.api.naver.API_SERVISE_URL_SHEME ?? "" });
        }

        const naverResult: TokenResponse | undefined = await new Promise((resolve, reject) => {
            NaverLogin.login(naverLoginParams, (err, token) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
                return;
            });
        });

        // [TO-DO] NaverLogin 실패 상황 예외 처리 필요
        const naverAccessToken: string | undefined = naverResult?.accessToken;

        const result: LoginServiceResult = (await this.villife.socialLogin(
            "naver",
            naverAccessToken ?? ""
        )) as LoginServiceResult;

        result.socialAccessToken = naverAccessToken;

        return result;
    }

    public async logout(): Promise<boolean> {
        NaverLogin.logout();
        return await this.villife.logout();
    }
    public async refresh(): Promise<any> {}

    public async join(params: NaverJoinParams): Response<SocialJoinResultType> {
        return await this.villife.socialJoin("naver", params);
    }
}

export default NaverLoginManager;
