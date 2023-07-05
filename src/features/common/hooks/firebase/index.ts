import React from "react";
import useSystemInfo from "../systeminfo/hooks";
import { useRecoilState } from "recoil";
import { LoginDataStateType } from "../states/atoms/login/types";
import { loginDataState } from "../states/atoms/login";
import AndroidFirebaseModule from "./android";
import IosFirebaseModule from "./ios";
import { Platform } from "react-native";
import VillifeServer from "../../../../libs/rest_apis/villife";
import IVillifeAuthManager from "../../../../libs/rest_apis/villife/auth/types";

export function useGetFirebaseToken(): string {
    const [token, setToken] = React.useState("");
    const sys = useSystemInfo();

    const getAccessTokenDependsOnPlatform = React.useCallback(async () => {
        let firebaseModule = null;

        switch (sys.platform.OS) {
            case "android":
                firebaseModule = new AndroidFirebaseModule();
                break;
            case "ios":
                firebaseModule = new IosFirebaseModule();
                break;
            default:
                console.error("The user is using an unexpected OS.");
                return;
        }

        const token = await firebaseModule.getAccessToken();
        setToken(token);
    }, []);

    React.useEffect(() => {
        getAccessTokenDependsOnPlatform();

        return () => {
            setToken("");
        };
    }, []);

    return token;
}

/**
 * @description need to attach top router , it is activated when loginData changes
 * @return void function which is API sends firebase token to backend server
 */
export function useAutoRegisterFirebaseToken() {
    const firebaseToken = useGetFirebaseToken();
    const [loginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const villife: IVillifeAuthManager = VillifeServer.getAuthenticator();

    React.useEffect(() => {
        //console.log("login Data has changed\n", "firebase token :", firebaseToken);
        if (!firebaseToken) return;
        if (loginData === null) return;

        if (loginData) {
            villife
                .registerFirebaseToken({
                    accessToken: loginData.accessToken,
                    refreshToken: loginData.refreshToken,
                    firebaseToken,
                })
                .then((r) => {
                    // if (Platform.OS === "ios") {
                    //     console.log("ios: ", firebaseToken);
                    // } else {
                    //     console.log("and: ", firebaseToken);
                    // }
                    console.log("Register firebase result token", r.data?.data);
                });
        }
    }, [loginData, firebaseToken]);
}
