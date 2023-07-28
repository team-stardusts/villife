import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { loginDataState } from "../../hooks/states/atoms/login";
import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../types";
import VillifeStorage from "../../../../libs/storage";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import useUserBasicInfo from "../../hooks/service/_user_info";

export default function useRoutingAdministratorByLogin(): void {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const setLoginData = useSetRecoilState<LoginDataType | null>(loginDataState);
    const userinfo = useUserBasicInfo();
    const navigation = useNavigation<RouterParams["navigation"]>();

    const storage = VillifeStorage.getInstance();
    //const __userinfo = useUserInfoService();

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

        userinfo === null ? handleFailedToLogin() : handleLogin();
    }, [userinfo?.rawdata, isLoading]);

    const handleAccessToApp = async (): Promise<void> => {
        await storage.login.get().then((data) => {
            setLoginData(data);
            setIsLoading(false);
        });
    };

    const handleFailedToLogin = async (): Promise<void> => {
        //__userinfo.clearUserInfo();
        navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
        });
    };

    const handleLogin = async (): Promise<void> => {
        //const resetResult = await __userinfo.resetUserInfo();

        // User 정보를 가져오는데 실패했을 때
        if (userinfo === null) {
            navigation.reset({
                index: 0,
                routes: [{ name: "login" }],
            });
            return;
        }

        // User가 임차인임과 동시에 등록한 주소가 없을 때
        // [TO-DO] 승인 대기중인 경우 대기 스크린으로 보내야함
        if (userinfo.isRenter && userinfo.roomID === undefined) {
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
