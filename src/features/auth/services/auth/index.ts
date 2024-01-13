import { VILLIFE_AUTHORITY, Villife } from "@team-stardusts/villife-client";
import VillifeStorage from "../../../../libs/storage";
import IVillifeStorage from "../../../../libs/storage/types";
import VillifeNativeClient from "../../../../libs/villife-native-client";
import SignerFactory from "./host";
import { SignInResult, VillifeSignInForm } from "./host/types";

export const loginDataTempValue = {
    name: "VILLIFE",
    authority: VILLIFE_AUTHORITY.RENTER,
    roomId: -1,
    roomNumber: -1,
    buildingId: -1,
    buildingRoadAddr: "EARTH",
};

export enum SingInException {
    FailedToLogin,
    NeedToAppleSignIn,
    FailedToGetUserInfo,
}

export type SignInFailedResult = {
    failure: SingInException;
    socialToken?: string | undefined;
};

export default function useAuthClient() {
    const storage: IVillifeStorage = VillifeStorage.getInstance();

    const signIn = async (
        host: Villife.Auth.HostType,
        params: VillifeSignInForm | undefined
    ): Promise<SignInFailedResult | null> => {
        const signer = SignerFactory.getSigner(host);
        const login = await signer.signIn(params).catch(() => null);

        if (login === null) {
            await storage.login.set(null);
            return {
                failure: SingInException.FailedToLogin,
            };
        }

        if (host === "apple" && login.needToSignUp) {
            return {
                failure: SingInException.NeedToAppleSignIn,
                socialToken: login.socialAccessToken,
            };
        }

        await storage.login.set(createLoginDataTemp(host, login));

        const userInfo = await new VillifeNativeClient().user.getUserInfo().catch(() => null);

        if (userInfo === null) {
            console.error("[AUTH_SERVICE]", "Failed to get user information.");
            await storage.login.set(null);

            return {
                failure: SingInException.FailedToGetUserInfo,
                socialToken: login.socialAccessToken,
            };
        }

        const logindata = {
            host,
            accessToken: login.accessToken,
            accessTokenExpiresAt: login.expireAt,
            refreshToken: login.refreshToken,
            ...userInfo,
        };

        await storage.login.set(logindata);

        return null;
    };

    const join = async (host: Villife.Auth.HostType, params: any) => {
        const signer = SignerFactory.getSigner(host);
        return signer.signUp(params);
    };

    /**
     * 유저 인포 갱신 함수
     * Use case :
     * 1. 유저의 주거인증 자동 승인
     * @returns boolean
     */
    const refreshUserInfo = async (): Promise<boolean> => {
        const login = await storage.login.get();
        if (login === null) {
            return false;
        }

        const userInfo = await new VillifeNativeClient().user.getUserInfo().catch(() => null);

        if (userInfo === null) {
            console.error("[AUTH_SERVICE]", "Failed to get user information.");
            await storage.login.set(null);
            return false;
        }

        const newData = {
            host: login.host,
            accessToken: login.accessToken,
            accessTokenExpiresAt: login.accessTokenExpiresAt,
            refreshToken: login.refreshToken,
            ...userInfo,
        };

        await storage.login.set(newData);

        return true;
    };

    const createLoginDataTemp = (host: Villife.Auth.HostType, login: SignInResult) => {
        return {
            ...loginDataTempValue,
            host,
            accessToken: login.accessToken,
            accessTokenExpiresAt: login.expireAt,
            refreshToken: login.refreshToken,
        };
    };

    return {
        signIn,
        join,
        refreshUserInfo,
    };
}
