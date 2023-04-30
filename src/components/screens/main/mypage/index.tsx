import { Button, View } from "react-native";
import { useRecoilState } from "recoil";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import useAuthService from "../../../../hooks/services/login/hooks";
import { loginDataState } from "../../../../hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../hooks/states/atoms/login/types";
import NavigationView from "../../../blocks/navigation";
import IconNavComponent from "../../../blocks/navigation/icon_navcomponent";
import MyPageScreenProps from "./type";
import LocalStorage from "../../../../libs/storage/localstorage";

export default function MyPageScreen({ navigation, route }: MyPageScreenProps) {
    const messages = useScreenMessage();
    const [loginData, setLoginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const logout = useAuthService().logout;

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.mypage.screen_title,
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
                <Button
                    onPress={() => navigation.navigate("set_building", { id: "", password: "" })}
                    aria-label="Decrement value"
                    title="건물 설정하기 테스트용"
                />
            </View>
        </NavigationView>
    );
}
