import { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";
import { useRecoilState } from "recoil";
import { loginDataState } from "../hooks/states/atoms/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouterParams, VillifeStackParamList } from "./types";
import LoginScreen from "../../auth/screens/login";
import CreateAccountScreen from "../../auth/screens/create_account";
import SetBuildingScreen from "../../auth/screens/set_building";
import TermsOfServiceScreen from "../../auth/screens/terms_of_service/index.";
import SearchAddressScreen from "../screens/search_address";
import HomeScreen from "../../main/home/screens/home";
import SplashScreen from "../../splash/screens/splash_screen";
import { useNavigation } from "@react-navigation/native";
import TestScreen from "../../test";
import WelcomeScreen from "../../auth/screens/welcome";
import { useAutoRegisterFirebaseToken } from "../hooks/firebase";
import NoticeRegisterScreen from "../../main/noti/screens/register";
import NoticeHomeScreen from "../../main/noti/screens/home";
import PermissionRequestScreen from "../../auth/screens/permission_request";
import VillifeStorage from "../../../libs/storage";
import NoticeModifyScreen from "../../main/noti/screens/modify";
import MyPageScreen from "../../main/mypage/screens/mypage";
import ParkingScreen from "../../main/parking/screens/home";
import PaymentScreen from "../../main/payment/screens";
import ComplaintHomeScreen from "../../main/complaint/screens/home";
import ComplaintRegisterScreen from "../../main/complaint/screens/register";
import ApprovalHomeScreen from "../../main/approval/screens/home";
import ComplaintDetailScreen from "../../main/complaint/screens/detail";
import RegisterVehicleScreen from "../../main/parking/screens/register_vehicle";
import MyPageHomeScreen from "../../main/mypage/screens/home";
import ComplaintModifyScreen from "../../main/complaint/screens/modify";
import RegisterGuestVehicleScreen from "../../main/parking/screens/register_guest_vehicle";
import { LoginDataStateType } from "../hooks/states/atoms/login/types";
import useUserInfoService from "../hooks/service/user_info";
import { VILLIFE_AUTHORITY } from "../../../libs/rest_apis/villife/absc";

enableScreens(true);

const Stack = createNativeStackNavigator<VillifeStackParamList>();

export default function ScreenRouter() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const navigation = useNavigation<RouterParams["navigation"]>();
    const storage = VillifeStorage.getInstance();
    const userinfo = useUserInfoService();

    useAutoRegisterFirebaseToken();

    const bootstrap = async () => {
        const data = await storage.login.get();

        setLoginData(data);
        setIsLoading(false);
    };

    // Loading과 Login data 검사 후 routing.
    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (loginData === null) {
            userinfo.clearUserInfo();

            navigation.reset({
                index: 0,
                routes: [{ name: "login" }],
                //routes: [{ name: "test" }],
            });
        } else {
            const onLogin = async () => {
                await userinfo.resetUserInfo();
                if (
                    (userinfo.basicInfo?.authority == VILLIFE_AUTHORITY.RENTER &&
                        userinfo.basicInfo.room_id == undefined) ||
                    userinfo.basicInfo == null
                ) {
                    console.log("[ONLOGIN] User has no room , navigate to Set Building Page");
                    navigation.navigate("set_building");
                    return;
                }
                navigation.reset({
                    index: 0,
                    routes: [{ name: "home" }],
                    //routes: [{ name: "test" }],
                });
            };
            onLogin();
        }
    }, [loginData, isLoading]);

    useEffect(() => {
        storage.addEventListener("CHANGE_LOGIN_VALUE", setLoginData);

        if (!isLoading) {
            return;
        }

        navigation.navigate("splash", {});
        bootstrap();

        return () => {
            storage.removeEventListener("CHANGE_LOGIN_VALUE");
        };
    }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }} initialRouteName={"login"}>
            <Stack.Group>
                <Stack.Screen name={"permission_request"} component={PermissionRequestScreen} />
                <Stack.Screen name={"login"} component={LoginScreen} />
                <Stack.Screen name={"terms_of_service"} component={TermsOfServiceScreen} />
                <Stack.Screen name={"create_account"} component={CreateAccountScreen} />
                <Stack.Screen name={"welcome"} component={WelcomeScreen} />
                <Stack.Screen name={"set_building"} component={SetBuildingScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"home"} component={HomeScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"parking"} component={ParkingScreen} />
                <Stack.Screen name={"register_vehicle"} component={RegisterVehicleScreen} />
                <Stack.Screen name={"register_guest_vehicle"} component={RegisterGuestVehicleScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"payment"} component={PaymentScreen} />
                <Stack.Screen name={"mypage"} component={MyPageScreen} />
                <Stack.Screen name={"my_page"} component={MyPageHomeScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"complaint"} component={ComplaintHomeScreen} />
                <Stack.Screen name={"complaint_register"} component={ComplaintRegisterScreen} />
                <Stack.Screen name={"complaint_detail"} component={ComplaintDetailScreen} />
                <Stack.Screen name={"complaint_modify"} component={ComplaintModifyScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"splash"} component={SplashScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name={"search_address"} component={SearchAddressScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"test"} component={TestScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"noti_home"} component={NoticeHomeScreen} />
                <Stack.Screen name={"noti_register"} component={NoticeRegisterScreen} />
                <Stack.Screen name={"noti_modify"} component={NoticeModifyScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"approval_home"} component={ApprovalHomeScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
