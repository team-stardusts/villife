import { SafeAreaView, View, Text } from "react-native";
import SetBuildingScreenProps from "./types";

export default function SetBuildingScreen({navigation, route}: SetBuildingScreenProps) {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex: 1, backgroundColor: "red"}}>
            </View>
        </SafeAreaView>
    )
}