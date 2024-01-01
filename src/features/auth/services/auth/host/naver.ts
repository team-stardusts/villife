import { Platform } from "react-native";
import DotEnv from "../../../../../libs/dotenv";
import Villife from "../../../../../libs/villife-client/types";
import { SignInResult, Signer } from "./types";
import { NaverLogin, TokenResponse } from "@react-native-seoul/naver-login";
import VillifeNativeClient from "../../../../../libs/villife-native-client";

const env = new DotEnv();

class NaverSigner implements Signer {
    private _api = new VillifeNativeClient().auth;

    public async signIn(): Promise<SignInResult> {
        const naverLoginParams = {
            kServiceAppName: env.app.NAME ?? "",
            kConsumerKey: env.api.naver.API_CONSUMER_KEY ?? "",
            kConsumerSecret: env.api.naver.API_CONSUMER_SECRET ?? "",
        };

        if (Platform.OS === "ios") {
            Object.assign(naverLoginParams, { kServiceAppUrlScheme: env.api.naver.API_SERVISE_URL_SHEME ?? "" });
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

        if (naverAccessToken === undefined) {
            throw new Error("Failed to sign in with Naver.");
        }

        const result = await this._api.signInWithSocialMedia("naver", naverAccessToken);

        return {
            ...result,
            socialAccessToken: naverAccessToken,
        };
    }

    public async signOut(): Promise<any> {
        NaverLogin.logout();
        return this._api.signOut();
    }

    public async signUp(params: Villife.Auth.SocialSignUpForm): Promise<any> {
        return this._api.signUpWithSocialMedia("naver", params);
    }
}

export default NaverSigner;
