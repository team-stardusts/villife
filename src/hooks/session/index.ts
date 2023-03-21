import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { isLoggedInState, loginDataState } from "../states/atoms/login"
import { IsLogggedInType, LoginDataStateType } from "../states/atoms/login/types";

export default function useLoginSessionHandler() {
    const handleLoginSession = () => {
        const [isLoggedIn, setIsLoggedIn] = useRecoilState<IsLogggedInType>(isLoggedInState);
        const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);

        useEffect(() => {
            console.log("Hello", loginData);

            if (isLoggedIn === null) {
                setIsLoggedIn(false);
            } 

            /*
            [TO-DO]
            1. storage에서 로그인 데이터를 가져옴.
                - result == null -> setIsLoggedIn(false);
                - result == LoginDataType
                    - result.expiresAt < now -> setIsLoggedIn(false);
                    - res.expiresAt > now
                        - 60000 < res.expiresAt - now =< 300000 -> login(); setIsLoggedIn(true);
                        - res.expiresAt > 300000 -> login(); setIsLoggedIn(true);
                        - else -> setIsLoggedIn(false);
            2. Interval로 로그인 확인 및 로그인 연장.
            */

        }, [loginData])
    }

    return handleLoginSession;
}