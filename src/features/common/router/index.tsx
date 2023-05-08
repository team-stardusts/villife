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
import useUserInfoService from "../hooks/service/user_info";
import ComplaintRegisterScreen from "../../main/complaint/screens/register";

enableScreens(true);

const Stack = createNativeStackNavigator<VillifeStackParamList>();

export default function ScreenRouter() {
    const [isLoading, setIsLoading] = useState(true);
    //const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean | null>(isLoggedInState);
    const [loginData, setLoginData] = useRecoilState(loginDataState);
    const navigation = useNavigation<RouterParams["navigation"]>();
    const storage = new VillifeStorage();
    const userService = useUserInfoService();

    useAutoRegisterFirebaseToken();

    const bootstrap = async () => {
        const data = await storage.login.get();

        setLoginData(data);
        setIsLoading(false);
    };

    // [TO-DO] Code 정리
    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (loginData === null) {
            //navigation.navigate("permission_request", {});
            navigation.reset({
                index: 0,
                routes: [{ name: "noti_home" }],
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: "home" }],
                //routes: [{ name: "test" }],
            });
        }
    }, [loginData, isLoading]);

    useEffect(() => {
        if (loginData?.accessToken === undefined) {
            return;
        }
        console.log("Refresh!", loginData?.accessToken.slice(0, 15));
    }, [loginData]);

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

    useEffect(() => {
        /* userService.getUserBasicInfo().then((userInfo) => {
            console.log(userInfo);
        }); */
    }, [loginData?.refreshToken]);

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
                <Stack.Screen name={"mypage"} component={MyPageScreen} />
                <Stack.Screen name={"parking_home"} component={ParkingScreen} />
                <Stack.Screen name={"payment"} component={PaymentScreen} />
                <Stack.Screen name={"complaint"} component={ComplaintHomeScreen} />
                <Stack.Screen name={"complaint_register"} component={ComplaintRegisterScreen} />
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
        </Stack.Navigator>
    );
}
