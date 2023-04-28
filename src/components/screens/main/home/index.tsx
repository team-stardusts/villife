import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Alert, BackHandler, Button, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import useAuthService from "../../../../hooks/services/login/hooks";
import { loginDataState } from "../../../../hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../hooks/states/atoms/login/types";
import Icon from "../../../atoms/icon";
import NavigationView from "../../../blocks/navigation";
import IconNavComponent from "../../../blocks/navigation/icon_navcomponent";
import HomeScreenProps from "./type";

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
    const messages = useScreenMessage();
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const logout = useAuthService().logout;

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.home.screen_title,
                navComponent: IconNavComponent,
                // [TO-DO] caption: 공지사항 -> messages.~~
                navComponentProps: {
                    iconName: "speaker",
                    caption: "공지사항",
                    onPress: () => {
                        navigation.navigate("noti_home");
                    },
                },
            }}>
            <View>
                <Button
                    title="logout"
                    onPress={async () => {
                        if (loginData !== null) {
                            logout();
                        }
                    }}
                />
                <Button aria-label="Decrement value" title="Decrement" />
                <Button aria-label="Decrement value" title="incrementByAmount" />
                <Button onPress={()=>navigation.navigate("set_building",{id:"",password:""})} aria-label="Decrement value" title="건물 설정하기 테스트용" />
            </View>
        </NavigationView>
    );
}
