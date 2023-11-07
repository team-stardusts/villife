import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loginDataState } from "../../hooks/states/atoms/login";
import VillifeStorage from "../../../../libs/storage";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import useUserInformation from "../../hooks/service/user_info";
import useFirebaseMessagingListener from "../../hooks/firebase/messaging/listening";
import useRouteFSM from "./_fsm";
import { LoadingState, Situation } from "./_fsm/types";

export default function useRouteFSMEngine(): void {
    const setLoginData = useSetRecoilState<LoginDataType | null>(loginDataState);
    const userinfo = useUserInformation();
    const storage = VillifeStorage.getInstance();
    const fsm = useRouteFSM();

    useFirebaseMessagingListener();

    // Listening on change login value
    useEffect(() => {
        storage.addEventListener("CHANGE_LOGIN_VALUE", (logindata) => {
            setLoginData(logindata);

            if (logindata === null) {
                fsm.situation = Situation.LOGGED_OUT;
                fsm.onChangeSituation();
            }
        });

        if (fsm.loading === LoadingState.IDLE) {
            return;
        }

        fsm.onAccessIntoApp();

        return () => {
            storage.removeEventListener("CHANGE_LOGIN_VALUE");
        };
    }, []);

    useEffect(() => {
        if (fsm.loading === LoadingState.BUSY) return;

        fsm.onLogin(userinfo).onChangeSituation();
        //userinfo === null ? handleFailedToLogin() : handleLogin();
    }, [userinfo?.rawdata, fsm.loading]);
}
