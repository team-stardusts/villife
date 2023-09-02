import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import RegisterBuildingScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useRegisterBuildingScreenStyles from "./styles";
import ScreenTitleView from "../../../../common/blocks/title_view";
import RoomCountSetter from "./blocks/room";
import AddressSetter from "./blocks/address";
import { BuildingFloors } from "./blocks/room/types";
import { useState } from "react";
import { BuildingInfo } from "./blocks/address/types";
import BuildingManagementServiceProvider from "../../services/provider";
import useUserInformation from "../../../../common/hooks/service/user_info";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useAdminInfoService from "../../../../common/hooks/service/user_info/service";

export default function RegisterBuildingScreen({ navigation, route }: RegisterBuildingScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useRegisterBuildingScreenStyles();
    const user = useUserInformation();
    const adminInfoService = useAdminInfoService();
    const service = new BuildingManagementServiceProvider();
    const [floors, setFloors] = useState<BuildingFloors>([]);
    const [buildingInfo, setBuildingInfo] = useState<BuildingInfo | null>(null);

    const isProperlyPrepared = (): boolean => {
        const isValidFloorValue = floors.filter((floor) => floor !== 0 && floor !== null).length !== 0;

        return buildingInfo !== null && isValidFloorValue;
    };

    const registerBuilding = async () => {
        if (user?.name === undefined) {
            console.error("[RegisterBuildingScreen]", "User 이름이 undifined라니...이럴리가 없는데?!");
            return;
        }

        // 확인 버튼 활성 조건에 "buildingInfo가 null이 아닐 것"이 있기 때문에
        // 그냥 Type narrowing임.
        if (buildingInfo === null) return;

        const _floors = floors;

        const result = await service.registerBuilding({
            basementInfo: _floors.shift() as number | null,
            buildingName: buildingInfo.name,
            ownerName: user.name,
            roadAddress: buildingInfo.address.roadAddress,
            roomsInfo: floors as number[],
        });

        if (result !== null) {
            await adminInfoService.initializeAdminInformation();

            VillifeToastMessage.showBottomToast("success", `\"${buildingInfo.name}\" 빌라를 등록했습니다.`);
            navigation.pop();
            return;
        }

        VillifeToastMessage.showBottomToast("error", "등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
    };

    return (
        <NavigationView
            headerOptions={{
                title: "건물 추가하기",
                backgroundColor: styles.main.nav.backgroundColor,
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.main.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={["건물 정보 추가하기"]}
                subtitles={["설정을 마치고 빌라이프 운영진의 승인을 기다려주세요."]}
                bottomButton={{
                    title: messages.words.okay,
                    disabled: !isProperlyPrepared(),
                    onPress: () => registerBuilding(),
                }}>
                <View style={styles.main.container}>
                    <View style={styles.main.searchingContainer}>
                        <AddressSetter styles={styles.search} onChangeBuildingInfo={setBuildingInfo} />
                    </View>
                    <View style={styles.main.roomSettingContainer}>
                        <RoomCountSetter styles={styles.room} onChangeRoomCount={setFloors} />
                    </View>
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}
