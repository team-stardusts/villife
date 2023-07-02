import NaverLoginManager from "./social/naver";
import VillifeLoginManager from "./villife";
import { AuthServicesReturn, ILoginManager, JoinServiceParams, LoginServiceParams, LoginServiceResult } from "./types";
import { HostType, SocialJoinResultType } from "../../../../libs/rest_apis/villife/auth/types";
import VillifeStorage from "../../../../libs/storage";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import { Response } from "../../../../libs/rest_apis/types";

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

export default function useAuthService(): AuthServicesReturn {
    const storage = VillifeStorage.getInstance();

    const login = async (host: HostType, params: LoginServiceParams | undefined): Promise<LoginServiceResult> => {
        const loginManager = LoginManagerProvider.getLoginManager(host);
        let data: LoginDataType | null = null;

        const result = await loginManager.login(params);

        if (result.isSuccessful && result.data?.data !== undefined) {
            data = {
                host: host,
                accessToken: result.data.data.access_token,
                accessTokenExpiresAt: result.data.data.expire_at,
                refreshToken: result.data.data.refresh_token,
            };
        }

        await storage.login.set(data);

        return result;
    };

    const join = async (host: HostType, params: JoinServiceParams): Response<SocialJoinResultType> => {
        const loginManager = LoginManagerProvider.getLoginManager(host);

        return await loginManager.join({
            id: params.id,
            password: params.password,
            authority: params.authority,
            access_token: params.accessToken,
        });
    };

    return {
        login,
        join,
    };
}
