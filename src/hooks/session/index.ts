import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { isLoggedInState, loginDataState } from "../states/atoms/login"
import { IsLogggedInType, LoginDataStateType } from "../states/atoms/login/types";
import useVillifeStorage from "../storage/hooks";

export default function useLoginSession() {
    const TEN_MINUTES: number = 600000;
    const [isLoggedIn, setIsLoggedIn] = useRecoilState<IsLogggedInType>(isLoggedInState);
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const storage = useVillifeStorage();
    
    const maintainSession = async() => {
        if (loginData === null) {
            setIsLoggedIn(false);
        }
        else {
            const expiresAt = loginData.accessTokenExpiresAt * 1000;
            const timeDelta = expiresAt - new Date().getTime();

            switch(true) {
                case timeDelta > 300000:
                    console.log("Refresh")
                    // [TO-DO] Firebase auth
                    //const result = await login()
                    //setLoginData()
                    setIsLoggedIn(true);
                default: // 토큰 기한 만료
                    setLoginData(null);
            }
        }
    }
    // [TO-DO] Code 정리
    
    const bootstrap = async() => {
        await storage.login.get()
            .then(loginDataInStorage => setLoginData(loginDataInStorage));
        setInterval(maintainSession, 1000)//TEN_MINUTES);
    }

    useEffect(() => {
        maintainSession();
    }, [loginData]);

    useEffect(() => {
        bootstrap();
    }, [])
}
