import { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";
import { useRecoilState } from "recoil";
import { loginDataState } from "../../hooks/states/atoms/login";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouterParams, StackParamList } from "./types";
import LoginScreen from "../screens/auth/login";
import CreateAccountScreen from "../screens/auth/create_account";
import SetBuildingScreen from "../screens/auth/set_building";
import TermsOfServiceScreen from "../screens/auth/terms_of_service/index.";
import SearchAddressScreen from "../screens/reusable/search_address";
import HomeScreen from "../screens/main/home";
import SplashScreen from "../screens/splash/splash_screen";
import { useNavigation } from "@react-navigation/native";
import TestScreen from "../screens/test";
import WelcomeScreen from "../screens/auth/welcome";
import { useAutoRegisterFirebaseToken } from "../../hooks/firebase/hooks";
import useVillifeStorage from "../../hooks/storage/hooks";
import NoticeRegisterScreen from "../screens/noti/register";
import NoticeHomeScreen from "../screens/noti/home";
import PermissionRequestScreen from "../screens/auth/permission_request";

enableScreens(true);

const Stack = createNativeStackNavigator<StackParamList>();

export default function ScreenRouter() {
    const [isLoading, setIsLoading] = useState(true);
    //const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean | null>(isLoggedInState);
    const [loginData, setLoginData] = useRecoilState(loginDataState);
    const navigation = useNavigation<RouterParams["navigation"]>();
    const storage = useVillifeStorage();

    useAutoRegisterFirebaseToken();

    const bootstrap = async () => {
        const loginDataInStorage = await storage.login.get();
        setLoginData(loginDataInStorage);
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
                routes: [{ name: "login", params: {} }],
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: "home", params: {} }],
            });
        }
    }, [loginData, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            return;
        }
        navigation.navigate("splash", {});
        bootstrap();
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
            </Stack.Group>
        </Stack.Navigator>
    );
}
