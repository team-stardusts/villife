import { Button, View } from "react-native";
import { useRecoilState } from "recoil";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { loginDataState } from "../../../../common/hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../common/hooks/states/atoms/login/types";
import NavigationView from "../../../../common/blocks/navigation";
import MyPageScreenProps from "./type";
import useLogoutService from "../../services/logout";
import useUserInfoService from "../../../../common/hooks/service/user_info";

export default function MyPageScreen({ navigation, route }: MyPageScreenProps) {
    const messages = useScreenMessage();
    const [loginData] = useRecoilState<LoginDataStateType>(loginDataState);
    const logout = useLogoutService().logout;
    const userInfo = useUserInfoService();

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
                        userInfo.service.resetUserBasicInfo();
                    }}
                />
                <Button title="Go to test screen" onPress={() => navigation.navigate("test")} />
                <Button aria-label="Decrement value" title="incrementByAmount" />
                <Button
                    onPress={() => navigation.navigate("set_building", { id: "", password: "" })}
                    aria-label="Decrement value"
                    title="건물 설정하기 테스트용"
                />
                <Button
                    onPress={() => navigation.navigate("my_page", { id: "", password: "" })}
                    aria-label="Decrement value"
                    title="마이페이지"
                />
                <Button
                    onPress={() => navigation.navigate("approval_home", { id: "", password: "" })}
                    aria-label="Decrement value"
                    title="요청함"
                />
                <Button
                    onPress={() => {
                        userInfo.service.resetUserBasicInfo();
                    }}
                    aria-label="Decrement value"
                    title="유저 인포 갱신"
                />
                <Button
                    onPress={() => {
                        if (userInfo.changeSelectedBuildingOfAdmin(userInfo.adminInfo?.managedBuildings[2]))
                            console.log("changed");
                    }}
                    aria-label="Decrement value"
                    title="admin 건물변경"
                />
            </View>
        </NavigationView>
    );
}
