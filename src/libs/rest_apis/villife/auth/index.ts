import AVillifeServerModule from "../absc";
import { Response } from "../../types";
import IVillifeAuthManager, {
    LoginResult,
    RegisterFirebaseTokenParams,
    RegisterFirebaseTokenResult,
    SendVerifyCode,
    SocialJoinParamsType,
    SocialJoinResultType,
    SocialLoginHostType,
    VerifyPersonalInfoParams,
    VillifeSignUpParams,
} from "./types";
import VillifeStorage from "../../../storage";

class VillifeAuthManager extends AVillifeServerModule implements IVillifeAuthManager {
    public async login(id: string, password: string): Response<LoginResult> {
        let route: string = this.routes.auth.login;

        return await this.request<any, LoginResult>({
            method: "post",
            url: route,
            data: {
                id,
                password,
            },
        });
    }

    public async logout(): Promise<boolean> {
        return await VillifeStorage.getInstance().login.set(null);
    }

    public async socialLogin(host: SocialLoginHostType, accessToken: string): Response<LoginResult> {
        let route: string;
        let _param;

        switch (host) {
            case "apple":
                route = this.routes.auth.appleSocialLogin;
                _param = {
                    auth_code: accessToken,
                };
                break;

            case "naver":
                route = this.routes.auth.naverSocialLogin;
                _param = {
                    access_token: accessToken,
                };

            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.auth.naverSocialLogin;
                _param = {
                    access_token: accessToken,
                };
        }

        return await this.request<any, LoginResult>({
            method: "post",
            url: route,
            data: _param,
        });
    }

    public async join(params: VillifeSignUpParams): Response<string> {
        const route = this.routes.auth.signUp;

        return await this.request({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async socialJoin(host: SocialLoginHostType, params: SocialJoinParamsType): Response<SocialJoinResultType> {
        let route: string;

        switch (host) {
            case "naver":
                route = this.routes.auth.naverSocialJoin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.auth.naverSocialJoin;
        }

        return await this.request<any, SocialJoinResultType>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async registerFirebaseToken(params: RegisterFirebaseTokenParams): Response<RegisterFirebaseTokenResult> {
        const route = this.routes.auth.registerFirebaseToken;

        return await this.requestAuthable<any, RegisterFirebaseTokenResult>({
            url: route,
            method: "get",
            params: {
                firebase_token: params.firebaseToken,
            },
        });
    }

    public async sendVerifyCode(params: SendVerifyCode): Response<string> {
        const route = this.routes.auth.sendVerifyCode;

        return await this.request<SendVerifyCode, string>({
            url: route,
            method: "post",
            data: params,
        });
    }

    public async verifyPersonalInfo(params: VerifyPersonalInfoParams): Response<string> {
        const route = this.routes.auth.verifyPersonalInfo;

        return await this.request<VerifyPersonalInfoParams, string>({
            url: route,
            method: "post",
            data: params,
        });
    }
}

export default VillifeAuthManager;
