import { useRecoilState } from "recoil";
import { LoginManagerProvider } from ".";
import { loginDataState } from "../../states/atoms/login";
import { LoginDataStateType } from "../../states/atoms/login/types";
import useVillifeStorage from "../../storage/hooks";
import { HostType } from "../../storage/tables/login/types";

type AuthServiceParams = {};

export default function useAuthService() {
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const storage = useVillifeStorage();

    const login = async (host: HostType, params: any) => {
        const loginManager = LoginManagerProvider.getLoginManager(host);
        const result = await loginManager.login(params);

        if (result.isSuccessful) {
            setLoginData(result.data?.data);
        }
    };
}
