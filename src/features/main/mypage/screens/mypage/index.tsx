import { Button, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import MyPageScreenProps from "./type";
import useLogoutService from "../../services/logout";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function MyPageScreen({ navigation, route }: MyPageScreenProps) {
    const messages = useScreenMessage();
    const logout = useLogoutService().logout;
    const user = useUserInformation();

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
                {user?.isAdmin ? (
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
                        if (user?.adminInfomation) {
                            user?.changeAdminSelectedBuilding(user?.adminInfomation?.managedBuildings[2]);
                        }

                        console.log(user?.adminInfomation);
                    }}
                    aria-label="Decrement value"
                    title="admin 건물변경"
                />
                {/* <Button
                    onPress={async () => {
                        const buildingManager = VillifeServer.getBuildingManager();
                        const param: UserResidenceValidationParams = { building_id: 7, room_number: 501 };
                        const result = await buildingManager.requestValidationOfUserRegidence(param);
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
                        const result = await buildingManager.validateVehicleResidenceForTest(param);
                        if (result.isSuccessful) {
                            console.log("vehicle data :", result.data);
                        }
                    }}
                    aria-label="Decrement value"
                    title="Vehicle 거주인증 Test"
                /> */}
            </View>
        </NavigationView>
    );
}
