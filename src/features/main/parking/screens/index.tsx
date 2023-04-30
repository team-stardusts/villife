import { View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../common/blocks/navigation";
import ParkingScreenProps from "./type";

export default function ParkingScreen({ navigation, route }: ParkingScreenProps) {
    const messages = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.screen_title,
            }}>
            <View></View>
        </NavigationView>
    );
}
