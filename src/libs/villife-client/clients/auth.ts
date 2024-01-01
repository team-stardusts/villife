import VillifeClientCommon from "../absc";
import VillifeError from "../errors";
import Villife from "../types";

class VillfeAuthClient extends VillifeClientCommon implements Villife.Auth.Client {
    public async signIn(id: string, password: string): Promise<Villife.Auth.LoginResult> {
        return this.request({
            method: "post",
            url: this._routes.auth.login,
            data: {
                id,
                password,
            },
        });
    }

    public async signInWithSocialMedia(host: Villife.Auth.HostType, token: string): Promise<Villife.Auth.LoginResult> {
        let route: string;
        let sign: any;

        switch (host) {
            case "apple":
                route = this._routes.auth.appleSocialLogin;
                sign = {
                    authCode: token,
                };
                break;

            case "naver":
                route = this._routes.auth.naverSocialLogin;
                sign = {
                    accessToken: token,
                };
                break;

            // Social login 추가 시 여기에 Route 추가
            default:
                throw new VillifeError(`'${host}' is invalid host name.`);
        }

        return this.request({
            method: "post",
            url: route,
            data: sign,
        });
    }

    public async signOut(): Promise<void> {
        this._session.clearTokens();
    }

    public async signUp(params: Villife.Auth.SignUpForm): Promise<boolean> {
        return this.request({
            method: "post",
            url: this._routes.auth.signUp,
            data: params,
        });
    }

    public async signUpWithSocialMedia(
        host: Villife.Auth.RegistedSocialMedia,
        form: Villife.Auth.SocialSignUpForm
    ): Promise<boolean> {
        let route: string;

        switch (host) {
            case "apple":
                route = this._routes.auth.appleSocialLogin;
                break;

            case "naver":
                route = this._routes.auth.naverSocialJoin;
                break;

            // Social login 추가 시 여기에 Route 추가
            default:
                throw new VillifeError(`'${host}' is invalid host name.`);
        }

        return this.request({
            method: "post",
            url: route,
            data: form,
        });
    }

    public async registerFirebaseToken(params: Villife.Auth.FirebaseRegistrationForm): Promise<string> {
        return this.request({
            method: "get",
            url: this._routes.auth.registerFirebaseToken,
            params,
        });
    }

    public async sendVerficationCode(phoneNumber: string): Promise<string> {
        return this.request({
            method: "post",
            url: this._routes.auth.sendVerifyCode,
            data: {
                phoneNumber,
            },
        });
    }

    public async verifyPersonalInfo(params: Villife.Auth.PersonalInfoVerificationForm): Promise<string> {
        return this.request({
            method: "post",
            url: this._routes.auth.verifyPersonalInfo,
            data: params,
        });
    }
}

export default VillfeAuthClient;
