import NaverLoginManager from "./social/naver";
import VillifeLoginManager from "./villife";
import { IAuthServiceProvider, ILoginManager, JoinServiceParams, LoginServiceParams, LoginResult } from "./types";
import { HostType, SocialJoinResultType } from "../../../../libs/rest_apis/villife/auth/types";
import VillifeStorage from "../../../../libs/storage";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import { Response } from "../../../../libs/rest_apis/types";
import VillifeServer from "../../../../libs/rest_apis/villife";
import { IVillifeUserInfoRestClient } from "../../../../libs/rest_apis/villife/user_info/types";
import IVillifeStorage from "../../../../libs/storage/types";

export class LoginManagerProvider {
    static getLoginManager(host: HostType): ILoginManager {
        switch (host) {
            case "naver":
                return new NaverLoginManager();
            default:
                return new VillifeLoginManager();
        }
    }
}

export default function useAuthService(): IAuthServiceProvider {
    const storage: IVillifeStorage = VillifeStorage.getInstance();
    const userApi: IVillifeUserInfoRestClient = VillifeServer.getUserInfoRestClient();
    class AuthServiceProvider implements IAuthServiceProvider {
        public async login(host: HostType, params: LoginServiceParams | undefined): Promise<LoginResult> {
            const loginManager = LoginManagerProvider.getLoginManager(host);

            const loginInfo = await loginManager.login(params);

            if (!loginInfo.isSuccessful || loginInfo.data?.data == undefined) {
                console.error("[AUTH_SERVICE]", "Failed to login.", "host:", host);
                await storage.login.set(null);
                return {
                    loginData: null,
                    socialAccessToken: loginInfo.socialAccessToken,
                };
            }

            // VillifeServer의 requestAuthable을 위해 임시로 로그인 데이터 세팅
            await storage.login.set({
                host: host,
                accessToken: loginInfo.data.data.access_token,
                accessTokenExpiresAt: loginInfo.data.data.expire_at,
                refreshToken: loginInfo.data.data.refresh_token,
                name: "",
                authority: 1,
                room_id: undefined,
                building_id: 99999999,
            });

            const userInfo = await userApi.getUserBasicInfo();

            if (!userInfo.isSuccessful || userInfo.data?.data == undefined) {
                console.error("[AUTH_SERVICE]", "Failed to get user information.");
                await storage.login.set(null);
                return {
                    loginData: null,
                    socialAccessToken: loginInfo.socialAccessToken,
                };
            }

            const loginData = {
                host: host,
                accessToken: loginInfo.data.data.access_token,
                accessTokenExpiresAt: loginInfo.data.data.expire_at,
                refreshToken: loginInfo.data.data.refresh_token,
                ...userInfo.data.data,
            };

            await storage.login.set(loginData);

            return {
                loginData,
                socialAccessToken: loginInfo.socialAccessToken,
            };
        }

        public async join(host: HostType, params: JoinServiceParams): Response<SocialJoinResultType> {
            const loginManager = LoginManagerProvider.getLoginManager(host);

            return await loginManager.join({
                id: params.id,
                password: params.password,
                authority: params.authority,
                access_token: params.accessToken,
            });
        }
    }

    return new AuthServiceProvider();
}
