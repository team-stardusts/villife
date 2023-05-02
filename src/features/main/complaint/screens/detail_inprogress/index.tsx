import { View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintDetailInProgressScreenProps from "./type";

export default function ComplaintDetailInProgressScreen({ navigation, route }: ComplaintDetailInProgressScreenProps) {
    const messages = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.screen_title,
            }}>
            <View></View>
        </NavigationView>
    );
}
