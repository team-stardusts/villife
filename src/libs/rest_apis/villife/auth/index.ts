import AVillifeServerModule from "../absc";
import { Response } from "../../types";
import IVillifeAuthManager, {
    LoginResult,
    RegisterFirebaseTokenParams,
    RegisterFirebaseTokenResult,
    SocialJoinParamsType,
    SocialJoinResultType,
    SocialLoginHostType,
} from "./types";
import VillifeStorage from "../../../storage";

class VillifeAuthManager extends AVillifeServerModule implements IVillifeAuthManager {
    public async login(id: string, password: string): Response<LoginResult> {
        let route: string = this.routes.login;

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
        return await new VillifeStorage().login.set(null);
    }

    public async socialLogin(host: SocialLoginHostType, accessToken: string): Response<LoginResult> {
        let route: string;

        switch (host) {
            case "naver":
                route = this.routes.naverSocialLogin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.naverSocialLogin;
        }

        return await this.request<any, LoginResult>({
            method: "post",
            url: route,
            data: { access_token: accessToken },
        });
    }

    public async join(): Promise<any> {}

    public async socialJoin(host: SocialLoginHostType, params: SocialJoinParamsType): Response<SocialJoinResultType> {
        let route: string;

        switch (host) {
            case "naver":
                route = this.routes.naverSocialJoin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.naverSocialJoin;
        }

        return await this.request<any, SocialJoinResultType>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async registerFirebaseToken(params: RegisterFirebaseTokenParams): Response<RegisterFirebaseTokenResult> {
        const route = this.routes.registerFirebaseToken;

        return await this.requestAuthable<any, RegisterFirebaseTokenResult>({
            url: route,
            method: "get",
            params: {
                firebase_token: params.firebaseToken,
            },
        });
    }
}

export default VillifeAuthManager;
