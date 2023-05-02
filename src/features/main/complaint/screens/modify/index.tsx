import { View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintModifyScreenProps from "./type";

export default function ComplaintModifyScreen({ navigation, route }: ComplaintModifyScreenProps) {
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
