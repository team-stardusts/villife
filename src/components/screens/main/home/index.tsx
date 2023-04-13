import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Alert, BackHandler, Button, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import useAuthService from "../../../../hooks/services/login/hooks";
import { loginDataState } from "../../../../hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../hooks/states/atoms/login/types";
import HomeScreenProps from "./type";

export default function HomeScreen(props: HomeScreenProps) {
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const logout = useAuthService().logout;

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
                    {
                        text: "취소",
                        onPress: () => null,
                    },
                    { text: "확인", onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            };

            const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => subscription.remove();
        }, [])
    );

    return (
        <View>
            <Button
                title="logout"
                onPress={async () => {
                    if (loginData !== null) {
                        logout();
                        setLoginData(null);
                    }
                }}
            />
            <Button aria-label="Decrement value" title="Decrement" />
            <Button aria-label="Decrement value" title="incrementByAmount" />
            <Button
                onPress={() => {
                    props.navigation.navigate("noti_home", {});
                }}
                aria-label="Decrement value"
                title="Link to Notice Home"
            />
        </View>
    );
}
