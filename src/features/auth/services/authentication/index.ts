import NaverLoginManager from "./social/naver";
import VillifeLoginManager from "./villife";
import { IAuthServiceProvider, ILoginManager, JoinServiceParams, LoginServiceParams, LoginResult } from "./types";
import { HostType, SocialJoinResultType } from "../../../../libs/rest_apis/villife/auth/types";
import VillifeStorage from "../../../../libs/storage";
import { Response } from "../../../../libs/rest_apis/types";
import VillifeServer from "../../../../libs/rest_apis/villife";
import { IVillifeUserInfoRestClient } from "../../../../libs/rest_apis/villife/user_info/types";
import IVillifeStorage from "../../../../libs/storage/types";
import AppleLoginManager from "./social/apple";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import { Authority } from "../../../../libs/rest_apis/villife/types";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";

export class LoginManagerProvider {
    static getLoginManager(host: HostType): ILoginManager {
        switch (host) {
            case "apple":
                return new AppleLoginManager();
            case "naver":
                return new NaverLoginManager();
            default:
                return new VillifeLoginManager();
        }
    }
}

export const LOGIN_BUILDING_ID_TEMP: number = 999999999;

export default function useAuthService(): IAuthServiceProvider {
    const storage: IVillifeStorage = VillifeStorage.getInstance();
    const userApi: IVillifeUserInfoRestClient = VillifeServer.getUserInfoRestClient();

    class AuthServiceProvider implements IAuthServiceProvider {
        public async login(host: HostType, params?: LoginServiceParams | undefined): Promise<LoginResult> {
            const loginManager: ILoginManager = LoginManagerProvider.getLoginManager(host);

            const loginInfo = await loginManager.login(params);

            if (loginInfo === null || !loginInfo.isSuccessful || loginInfo.data?.data == undefined) {
                console.log("[AUTH_SERVICE]", "Failed to login.", "host:", host);
                await storage.login.set(null);
                return {
                    loginData: null,
                    socialAccessToken: loginInfo?.socialAccessToken,
                };
            }

            // VillifeServer의 requestAuthable을 위해 임시로 로그인 데이터 세팅
            let _loginData: LoginDataType = {
                host: host,
                accessToken: loginInfo.data.data.access_token,
                accessTokenExpiresAt: loginInfo.data.data.expire_at,
                refreshToken: loginInfo.data.data.refresh_token,
                name: "",
                authority: VILLIFE_AUTHORITY.RENTER,
                room_id: 0,
                room_number: 0,
                building_id: LOGIN_BUILDING_ID_TEMP,
                building_road_addr: "",
            };

            await storage.login.set(_loginData);

            if (host === "apple" && loginInfo.data.data?.need_to_sign_up === true) {
                return {
                    loginData: null,
                    socialAccessToken: loginInfo.socialAccessToken,
                };
            }

            const userInfo = await userApi.getUserBasicInfo();

            // Apple의 경우 서버에 임시로 유저 정보를 저장하므로 이 분기에 해당하지 않음
            if (!userInfo.isSuccessful || userInfo.data?.data == undefined) {
                console.error("[AUTH_SERVICE]", "Failed to get user information.");
                await storage.login.set(null);
                return {
                    loginData: null,
                    socialAccessToken: loginInfo.socialAccessToken,
                };
            }

            _loginData = {
                host: host,
                accessToken: loginInfo.data.data.access_token,
                accessTokenExpiresAt: loginInfo.data.data.expire_at,
                refreshToken: loginInfo.data.data.refresh_token,
                ...userInfo.data.data,
            };
            console.log(_loginData);
            await storage.login.set(_loginData);

            return {
                loginData: _loginData,
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
