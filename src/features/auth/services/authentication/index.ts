import { IAuthServiceProvider, JoinServiceParams, LoginServiceParams, LoginResult } from "./types";
import { HostType } from "../../../../libs/rest_apis/villife/auth/types";
import VillifeStorage from "../../../../libs/storage";
import { Response } from "../../../../libs/rest_apis/types";
import IVillifeStorage from "../../../../libs/storage/types";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import VillifeNativeClient from "../../../../libs/villife-native-client";
import SignerFactory from "../auth/host";
import { Villife } from "@team-stardusts/villife-client";

/* export class LoginManagerProvider {
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
} */

export const LOGIN_BUILDING_ID_TEMP: number = 999999999;

export default function useAuthService(): IAuthServiceProvider {
    const storage: IVillifeStorage = VillifeStorage.getInstance();
    const userApi: Villife.User.Client = new VillifeNativeClient().user;

    class AuthServiceProvider implements IAuthServiceProvider {
        public async login(host: HostType, params?: LoginServiceParams | undefined): Promise<LoginResult> {
            const signer = SignerFactory.getSigner(host);
            const loginInfo = await signer.signIn(params).catch(() => null);

            if (loginInfo === null) {
                console.log("[AUTH_SERVICE]", "Failed to login.", "host:", host);
                await storage.login.set(null);
                return {
                    loginData: null,
                };
            }

            // VillifeServer의 requestAuthable을 위해 임시로 로그인 데이터 세팅
            let _loginData: LoginDataType = {
                host: host,
                accessToken: loginInfo.accessToken,
                accessTokenExpiresAt: loginInfo.expireAt,
                refreshToken: loginInfo.refreshToken,
                name: "",
                authority: VILLIFE_AUTHORITY.RENTER,
                roomId: 0,
                roomNumber: 0,
                buildingId: LOGIN_BUILDING_ID_TEMP,
                buildingRoadAddr: "",
            };

            await storage.login.set(_loginData);

            if (host === "apple" && loginInfo.needToSignUp === true) {
                return {
                    loginData: null,
                    socialAccessToken: loginInfo.socialAccessToken,
                };
            }

            const userInfo = await userApi.getUserInfo().catch(() => null);

            // Apple의 경우 서버에 임시로 유저 정보를 저장하므로 이 분기에 해당하지 않음
            if (userInfo === null) {
                console.error("[AUTH_SERVICE]", "Failed to get user information.");
                await storage.login.set(null);
                return {
                    loginData: null,
                    socialAccessToken: loginInfo.socialAccessToken,
                };
            }

            _loginData = {
                host: host,
                accessToken: loginInfo.accessToken,
                accessTokenExpiresAt: loginInfo.expireAt,
                refreshToken: loginInfo.refreshToken,
                ...userInfo,
            };

            await storage.login.set(_loginData);

            return {
                loginData: _loginData,
                socialAccessToken: loginInfo.socialAccessToken,
            };
        }

        public async join(host: HostType, params: JoinServiceParams): Response<boolean> {
            const signer = SignerFactory.getSigner(host);
            return signer.signUp(params);
        }

        /**
         * 유저 인포 갱신 함수
         * Use case :
         * 1. 유저의 주거인증 자동 승인
         * @returns boolean
         */
        public async refreshUserInfo(): Promise<boolean> {
            const loginData = await storage.login.get();
            if (loginData === null) {
                return false;
            }

            const userInfo = await userApi.getUserInfo().catch(() => null);

            if (userInfo === null) {
                console.error("[AUTH_SERVICE]", "Failed to get user information.");
                await storage.login.set(null);
                return false;
            }

            const newData = {
                host: loginData.host,
                accessToken: loginData.accessToken,
                accessTokenExpiresAt: loginData.accessTokenExpiresAt,
                refreshToken: loginData.refreshToken,
                ...userInfo,
            };

            await storage.login.set(newData);

            return true;
        }
    }

    return new AuthServiceProvider();
}
