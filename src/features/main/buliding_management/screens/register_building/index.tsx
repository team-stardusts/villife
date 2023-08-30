import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import RegisterBuildingScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useRegisterBuildingScreenStyles from "./styles";
import ScreenTitleView from "../../../../common/blocks/title_view";
import RoomCountSetter from "./blocks/room";
import AddressSetter from "./blocks/address";
import { BuildingFloors } from "./blocks/room/types";
import { useEffect, useState } from "react";
import { SelectedAddressType } from "../../../../common/hooks/states/atoms/address/selected_address/types";
import { BuildingInfo } from "./blocks/address/types";

export default function RegisterBuildingScreen({ navigation, route }: RegisterBuildingScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useRegisterBuildingScreenStyles();
    const [floors, setFloors] = useState<BuildingFloors>([]);
    const [buildingInfo, setBuildingInfo] = useState<BuildingInfo | null>(null);

    useEffect(() => {
        console.log(buildingInfo);
    }, [buildingInfo]);

    const isProperlyPrepared = (): boolean => {
        const isValidFloorValue = floors.filter((floor) => floor !== 0 && floor !== null).length !== 0;

        return buildingInfo !== null && isValidFloorValue;
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
