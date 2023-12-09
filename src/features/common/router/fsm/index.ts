import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginDataState } from "../../hooks/states/atoms/login";
import VillifeStorage from "../../../../libs/storage";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import useUserInformation from "../../hooks/service/user_info";
import useFirebaseMessagingListener from "../../hooks/firebase/messaging/listening";
import useRouteFSM from "./_fsm";
import { LoadingState, Situation } from "./_fsm/types";
import { IEventListenable } from "../../global_interface";
import { NetInfoEvents } from "../../../../libs/netinfo/types";
import { NetInfoState } from "@react-native-community/netinfo";
import NetInfoEventHandler from "../../../../libs/netinfo";
import { isConnetedToNetworkState } from "../../hooks/states/atoms/network";
import { Platform } from "react-native";

export default function useRouteFSMEngine(): void {
    const setLoginData = useSetRecoilState<LoginDataType | null>(loginDataState);
    const userinfo = useUserInformation();
    const storage = VillifeStorage.getInstance();
    const fsm = useRouteFSM();
    const netinfo: IEventListenable<NetInfoEvents, NetInfoState> = new NetInfoEventHandler();
    const [isConnetedToNetwork, setIsConnectedToNetwork] = useRecoilState<boolean>(isConnetedToNetworkState);

    useFirebaseMessagingListener();

    // Listening on change login value
    useEffect(() => {
        // 앱 시작 시 네트워크 스테이트 설정
        // Network가 연결되지 않은 경우 예외 처리를 위함
        netinfo.listen("changed", (_, state) => {
            console.log("Network", Platform.OS, state.isConnected);
            setIsConnectedToNetwork(state.isConnected === null ? false : state.isConnected);
        });

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
            netinfo.removeAllListeners();
            storage.removeEventListener("CHANGE_LOGIN_VALUE");
        };
    }, []);

    useEffect(() => {
        if (fsm.loading === LoadingState.BUSY) return;

        fsm.onLogin(userinfo).onChangeSituation();
        //userinfo === null ? handleFailedToLogin() : handleLogin();
    }, [userinfo?.rawdata, fsm.loading]);
}
