import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState, loginDataState } from "../states/atoms/login";
import { IsLogggedInType, LoginDataStateType } from "../states/atoms/login/types";
import useVillifeStorage from "../storage/hooks";
import { useAutoRegisterFirebaseToken } from "../firebase/hooks";
import VillifeServer from "../../libs/rest_apis/villife";

export default function useLoginSession() {
    const FIVE_MINUTES: number = 300000;
    const [isLoggedIn, setIsLoggedIn] = useRecoilState<IsLogggedInType>(isLoggedInState);
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const storage = useVillifeStorage();

    useAutoRegisterFirebaseToken();
    // [TO-DO] 코드 정리 필요. Login data를 효율적으로 핸들링 할 방안이 필요함.
    const maintainSession = async () => {
        if (loginData === null) {
            setIsLoggedIn(false);
        } else {
            const expiresAt = loginData.accessTokenExpiresAt * 1000;
            const timeDelta = expiresAt - new Date().getTime();

            switch (true) {
                case timeDelta > 500000: //> 300000:
                    console.log("No Refresh", timeDelta);
                    if (!isLoggedIn) {
                        setIsLoggedIn(true);
                    }
                    break;

                /* case 200000 < timeDelta && timeDelta <= 500000: // <= 30000:
                    console.log("Refresh", timeDelta);
                    const { isSuccessful, data } = await villife.refresh({
                        expiredAccessToken: loginData.accessToken,
                        refreshToken: loginData.refreshToken,
                    });

                    console.log(data.expire_at);

                    if (isSuccessful) {
                        await storage.login.set(loginData);
                        setLoginData({
                            ...loginData,
                            accessToken: data.access_token,
                            accessTokenExpiresAt: data.expire_at,
                        });
                        setIsLoggedIn(true);
                    } else {
                        // [TO-DO] Refresh가 실패하는 상황에 대한 예외 처리 필요
                        setIsLoggedIn(false);
                        setLoginData(null);
                        await storage.login.set(null);
                    }
                    break; */

                default: // 토큰 기한 만료
                    setIsLoggedIn(false);
                    setLoginData(null);
            }
        }
    };

    const bootstrap = async () => {
        await storage.login.get().then((loginDataInStorage) => {
            setLoginData(loginDataInStorage);
        });
        setInterval(async () => await maintainSession(), FIVE_MINUTES);
    };

    useEffect(() => {
        if (loginData !== null) {
            maintainSession();
        }
    }, [loginData]);

    useEffect(() => {
        bootstrap();

        return;
    }, []);
}
