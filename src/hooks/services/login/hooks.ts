import { useEffect } from "react";
import { Alert } from "react-native";
import { useRecoilState } from "recoil";
import { LoginManagerProvider } from ".";
import { loginDataState } from "../../states/atoms/login";
import { LoginDataStateType } from "../../states/atoms/login/types";
import useVillifeStorage from "../../storage/hooks";
import { HostType, LoginDataType } from "../../storage/tables/login/types";
import { AuthServicesReturn, LoginServiceParams, LoginServiceResult } from "./types";

export default function useAuthService(): AuthServicesReturn {
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const storage = useVillifeStorage();

    useEffect(() => {
        if (loginData === null) {
            return;
        }
        storage.login.set(loginData);
    }, [loginData]);

    const login = async (host: HostType, params: LoginServiceParams | undefined): Promise<LoginServiceResult> => {
        const loginManager = LoginManagerProvider.getLoginManager(host);
        let data: LoginDataType | null = null;

        const result = await loginManager.login(params);

        /* if (result.isSuccessful && result.data) {
            const data = result.data.data;
            _loginData = {
                host: host,
                accessToken: data.access_token,
                accessTokenExpiresAt: data.expire_at,
                refreshToken: data.refresh_token,
            };
        } else {
            Alert.alert("LoginFailt");
        } */

        if (result.isSuccessful && result.data?.data !== undefined) {
            data = {
                host: host,
                accessToken: result.data.data.access_token,
                accessTokenExpiresAt: result.data.data.expire_at,
                refreshToken: result.data.data.refresh_token,
            };
        }

        setLoginData(data);

        return result;
    };

    const logout = async (): Promise<void> => {
        let host: HostType = "villife";
        if (loginData !== null) {
            host = loginData.host;
        }

        const loginManager = LoginManagerProvider.getLoginManager(host);

        await loginManager.logout();
    };

    return {
        login,
        logout,
    };
}
