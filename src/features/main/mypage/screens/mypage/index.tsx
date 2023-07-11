import { Button, View } from "react-native";
import { useRecoilState } from "recoil";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { loginDataState } from "../../../../common/hooks/states/atoms/login";
import { LoginDataStateType } from "../../../../common/hooks/states/atoms/login/types";
import NavigationView from "../../../../common/blocks/navigation";
import MyPageScreenProps from "./type";
import useLogoutService from "../../services/logout";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import VillifeStorage from "../../../../../libs/storage";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import {
    UserResidenceValidationParams,
    VehicleResidenceValidationParams,
} from "../../../../../libs/rest_apis/villife/building/types";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";

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
                <Button title="logout" onPress={logout} />
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
                {userInfo.basicInfo?.authority == VILLIFE_AUTHORITY.ADMIN ? (
                    <Button
                        onPress={() => navigation.navigate("approval_home", { id: "", password: "" })}
                        aria-label="Decrement value"
                        title="요청함"
                    />
                ) : (
                    <></>
                )}
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

                        console.log(userInfo.adminInfo);
                    }}
                    aria-label="Decrement value"
                    title="admin 건물변경"
                />
                <Button
                    onPress={async () => {
                        const buildingManager = VillifeServer.getBuildingManager();
                        const param: UserResidenceValidationParams = { building_id: 7, room_number: 501 };
                        const result = await buildingManager.RequestValidationOfUserRegidence(param);
                        if (result.isSuccessful) {
                            console.log("approval data :", result.data);
                        }
                    }}
                    aria-label="Decrement value"
                    title="User 거주인증 Test"
                />
                <Button
                    onPress={async () => {
                        const buildingManager = VillifeServer.getBuildingManager();
                        const param: VehicleResidenceValidationParams = {
                            etd: 253396944000,
                            eta: 253396944000,
                            model: "싼타페",
                            plate_number: "22나 2222",
                            vehicle_type: "4WD",
                        };
                        const result = await buildingManager.ValidateVehicleResidenceForTest(param);
                        if (result.isSuccessful) {
                            console.log("vehicle data :", result.data);
                        }
                    }}
                    aria-label="Decrement value"
                    title="Vehicle 거주인증 Test"
                />
            </View>
        </NavigationView>
    );
}
