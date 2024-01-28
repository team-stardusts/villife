import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { loginDataState } from "../../hooks/states/atoms/login";
import VillifeStorage from "../../../../libs/storage";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import useUserInformation from "../../hooks/service/user_info";
import useRouteFSM from "./machine";
import { RouteFiniteStateMachine, VillifeAppState, VillifeLoginState } from "./types";
import { objectToCamel } from "ts-case-convert";
import { Linking } from "react-native";

export default function useRouteFSMEngine(): void {
    const setLoginData = useSetRecoilState<LoginDataType | null>(loginDataState);
    const userinfo = useUserInformation();
    const storage = VillifeStorage.getInstance();
    const fsm: RouteFiniteStateMachine = useRouteFSM();
    //const navigation = useNavigation<VillifeNavigation>();

    const getInitURL = async () => {
        const initURL = await Linking.getInitialURL(); // 없을 경우 null을 반환한다.
        if (initURL) {
            const path = initURL.split("//")[1];
            if (path.startsWith("wc?uri=")) {
                const uri = decodeURIComponent(path.slice(7));
                //navigation.navigate('작업 처리할 컴포넌트', { uri: uri ? uri : '' });
            }

            return path;
        }

        return null;
    };

    // Listening on change login value
    useEffect(() => {
        getInitURL().then((r) => r && console.log("Initial URL:", r));

        storage.addEventListener("CHANGE_LOGIN_VALUE", (logindata) => {
            setLoginData(logindata === null ? null : (objectToCamel(logindata) as LoginDataType));
            // 로그인 정보가 없으므로 로그아웃 처리
            if (logindata === null) {
                fsm.loginState = VillifeLoginState.SIGN_OUT;
            }
        });

        if (fsm.appState === VillifeAppState.BUSY) {
            return;
        }

        fsm.onAccessIntoApp();

        return () => {
            storage.removeEventListener("CHANGE_LOGIN_VALUE");
        };
    }, []);

    useEffect(() => {
        if (fsm.appState === VillifeAppState.IDLE) return;

        fsm.onSignIn(userinfo);
        //userinfo === null ? handleFailedToLogin() : handleLogin();
    }, [userinfo?.rawdata, fsm.appState]);

    useEffect(() => {
        if (fsm.appState === VillifeAppState.IDLE) {
            return;
        }
        fsm.onChangeUserState();
    }, [fsm.loginState, fsm.appState]);
}
