import { View } from "react-native";
import NavigationView from "../../blocks/navigation";
import useBuildingInfoScreenScreenStyles from "./styles";
import BuildingInfoScreenProp from "./types";

export default function BuildingInfoScreen({ navigation, route }: BuildingInfoScreenProp) {
    const style = useBuildingInfoScreenScreenStyles();
    return (
        <NavigationView
            headerOptions={{
                shown: false,
                title: "건물 정보",
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <View style={style.container}></View>
        </NavigationView>
    );
}
