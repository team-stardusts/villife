import VillifeStorage from "../../../../libs/storage";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import IVillifeStorage from "../../../../libs/storage/types";
import { VILLIFE_AUTHORITY } from "../../../../libs/villife-client";
import Villife from "../../../../libs/villife-client/types";
import SignerFactory from "./host";
import { SignInResult, VillifeSignInForm } from "./host/types";

export const loginDataTempValue = {
    name: "VILLIFE",
    authority: VILLIFE_AUTHORITY.RENTER,
    room_id: -1,
    room_number: -1,
    building_id: -1,
    building_road_addr: "EARTH",
};

export enum SingInException {
    FailedToLogin,
    NeedToAppleSignIn,
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

        return null;
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
    };
}
