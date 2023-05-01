import { Button, View } from "react-native";
import { useRecoilState } from "recoil";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { loginDataState } from "../../../../common/hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../common/hooks/states/atoms/login/types";
import NavigationView from "../../../../common/blocks/navigation";
import MyPageScreenProps from "./type";
import useLogoutService from "../../services/logout";

export default function MyPageScreen({ navigation, route }: MyPageScreenProps) {
    const messages = useScreenMessage();
    const [loginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const logout = useLogoutService().logout;

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
