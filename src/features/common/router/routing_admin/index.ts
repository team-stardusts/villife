import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { loginDataState } from "../../hooks/states/atoms/login";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../types";
import VillifeStorage from "../../../../libs/storage";
import { LoginDataType } from "../../../../libs/storage/tables/login/types";
import useUserInformation from "../../hooks/service/user_info";
import useAdminInfoService from "../../hooks/service/user_info/service";

export default function useRoutingAdministratorByLogin(): void {
    const adminService = useAdminInfoService();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const setLoginData = useSetRecoilState<LoginDataType | null>(loginDataState);
    const userinfo = useUserInformation();
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();

    const storage = VillifeStorage.getInstance();

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
        navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
        });
    };

    const handleLogin = async (): Promise<void> => {
        // User 정보를 가져오는데 실패했을 때
        if (userinfo === null) {
            navigation.reset({
                index: 0,
                routes: [{ name: "login" }],
                //routes: [{ name: "building_management" }],
            });
            return;
        }

        if (userinfo.isAdmin) {
            await adminService.initializeAdminInformation();
        }

        // User가 임차인임과 동시에 등록한 주소가 없을 때
        // [TO-DO] 승인 대기중인 경우 대기 스크린으로 보내야함
        if (userinfo.isRenter && (userinfo.roomID === 0 || userinfo.roomID === undefined)) {
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
                //routes: [{ name: "management_fee" }],
                //routes: [{ name: "home" }, { name: "building_management" }],
                //routes: [{ name: "home" }, { name: "register_building" }],
                //routes: [{ name: "building_management" }],
            });
        }

        // 이 곳에 다른 스크린으로 라우팅 하는 코드를 삽입할 경우
        // 일정 시간이 지나 Access token이 초기화 될 시
        // 유저가 보고 있던 스크린을 잃음
    };
}
