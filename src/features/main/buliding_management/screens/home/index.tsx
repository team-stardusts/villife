import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingManagementScreenProps from "./types";
import { Text } from "react-native-svg";

export default function BuildingManagementScreen({ navigation, route }: BuildingManagementScreenProps) {
    return (
        <NavigationView
            headerOptions={{
                title: "Hello",
                backgroundColor: "white",
            }}
            bodyOptions={{
                backgroundColor: "white",
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}>
            <View>
                <Text>Hello</Text>
            </View>
        </NavigationView>
    );
}
