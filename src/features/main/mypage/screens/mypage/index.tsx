import { Button, View } from "react-native";
import { useRecoilState } from "recoil";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useAuthService from "../../../../common/hooks/services/login/hooks";
import { loginDataState } from "../../../../common/hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../common/hooks/states/atoms/login/types";
import NavigationView from "../../../../common/blocks/navigation";
import MyPageScreenProps from "./type";

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
