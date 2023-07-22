import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginDataStateType } from "../../hooks/states/atoms/login/types";
import { loginDataState } from "../../hooks/states/atoms/login";
import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../types";
import VillifeStorage from "../../../../libs/storage";
import useUserInfoService from "../../hooks/service/user_info";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import { Alert } from "react-native";

export default function useRoutingAdministratorByLogin(): void {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const navigation = useNavigation<RouterParams["navigation"]>();

    const storage = VillifeStorage.getInstance();
    const userinfo = useUserInfoService();

    // Listening on change login value
    useEffect(() => {
        storage.addEventListener("CHANGE_LOGIN_VALUE", setLoginData);

        if (!isLoading) {
            return;
        }

        navigation.navigate("splash", {});
        handleAccessToApp();

        return () => {
            storage.removeEventListener("CHANGE_LOGIN_VALUE");
        };
    }, []);

    useEffect(() => {
        if (isLoading) return;

        loginData === null ? handleFailedToLogin() : handleLogin();
    }, [loginData, isLoading]);

    const handleAccessToApp = async (): Promise<void> => {
        await storage.login.get().then((data) => {
            setLoginData(data);
            setIsLoading(false);
        });
    };

    const handleFailedToLogin = async (): Promise<void> => {
        userinfo.clearUserInfo();
        navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
        });
    };

    const handleLogin = async (): Promise<void> => {
        const resetResult = await userinfo.resetUserInfo();

        // User 정보를 가져오는데 실패했을 때
        if (resetResult === undefined) {
            navigation.reset({
                index: 0,
                routes: [{ name: "login" }],
            });
            return;
        }

        // User가 임차인임과 동시에 등록한 주소가 없을 때
        // [TO-DO] 승인 대기중인 경우 대기 스크린으로 보내야함
        if (resetResult.authority == VILLIFE_AUTHORITY.RENTER && resetResult.room_id == undefined) {
            console.log("[ONLOGIN] User has no room , navigate to Set Building Page");
            navigation.reset({
                index: 0,
                routes: [{ name: "set_building" }],
            });
            return;
        }

        const routes = navigation.getState().routes;

        // Default screen이 login이므로, 리프레쉬를 하더라도 0번 스택에 login이 쌓임
        if (routes.length > 0 && routes[0].name === "login") {
            // 정상 로그인
            navigation.reset({
                index: 0,
                routes: [{ name: "home" }],
                //routes: [{ name: "test" }],
            });
        }

        // 이 곳에 다른 스크린으로 라우팅 하는 코드를 삽입할 경우
        // 일정 시간이 지나 Access token이 초기화 될 시
        // 유저가 보고 있던 스크린을 잃음
    };
}
