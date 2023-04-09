import { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../hooks/states/atoms/login";
import useLoginSession from "../../hooks/session";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "./types";
import LoginScreen from "../screens/auth/login";
import CreateAccountScreen from "../screens/auth/create_account";
import SetBuildingScreen from "../screens/auth/set_building";
import TermsOfServiceScreen from "../screens/auth/terms_of_service/index.";
import SearchAddressScreen from "../screens/reusable/search_address";
import HomeScreen from "../screens/main/home";
import SplashScreen from "../screens/splash/splash_screen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import TestScreen from "../screens/test";
import WelcomeScreen from "../screens/auth/welcome";

enableScreens(true);

const Stack = createNativeStackNavigator<StackParamList>();

type RouterParams = NativeStackScreenProps<StackParamList>;

export default function ScreenRouter() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean | null>(isLoggedInState);
    const navigation = useNavigation<RouterParams["navigation"]>();

    useLoginSession();
    // [TO-DO] Code 정리
    useEffect(() => {
        if (isLoggedIn === null) {
            setIsLoading(false);
            navigation.navigate("terms_of_service", { role: "member", id: "test", password: "test" });
            //navigation.navigate("splash", {});
        } else if (isLoggedIn === true) {
            setIsLoading(false);
            navigation.navigate("home", {});
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"login"}>
            <Stack.Group>
                <Stack.Screen name={"login"} component={LoginScreen} />
                <Stack.Screen name={"terms_of_service"} component={TermsOfServiceScreen} />
                <Stack.Screen name={"create_account"} component={CreateAccountScreen} />
                <Stack.Screen name={"welcome"} component={WelcomeScreen} />
                <Stack.Screen name={"set_building"} component={SetBuildingScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ headerShown: true }}>
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
        </Stack.Navigator>
    );
}
