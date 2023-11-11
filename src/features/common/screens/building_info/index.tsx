import { ScrollView } from "react-native";
import NavigationView from "../../blocks/navigation";
import useBuildingInfoScreenStyles from "./styles";
import BuildingInfoScreenProp from "./types";
import useBuildingInfo from "./service";
import BuildingInfoView from "./blocks/info";
import { View } from "react-native";

export default function BuildingInfoScreen({ navigation, route }: BuildingInfoScreenProp) {
    const styles = useBuildingInfoScreenStyles();
    const building = useBuildingInfo();

    return (
        <NavigationView
            headerOptions={{
                title: "건물 정보",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {building !== null && <BuildingInfoView buildingInfo={building} />}
                <View style={styles.dummy}></View>
            </ScrollView>
        </NavigationView>
    );
}
