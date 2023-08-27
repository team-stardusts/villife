import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import RegisterBuildingScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useRegisterBuildingScreenStyles from "./styles";
import ScreenTitleView from "../../../../common/blocks/title_view";
import RoomCountSetter from "./blocks/room";
import AddressSetter from "./blocks/address";

export default function RegisterBuildingScreen({ navigation, route }: RegisterBuildingScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useRegisterBuildingScreenStyles();

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
                subtitles={["설정을 마치고 빌라이프 운영진의 승인을 기다려주세요."]}>
                <View style={styles.main.container}>
                    <View style={styles.main.searchingContainer}>
                        <AddressSetter styles={styles.search} />
                    </View>
                    <View style={styles.main.roomSettingContainer}>
                        <RoomCountSetter styles={styles.room} />
                    </View>
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}
