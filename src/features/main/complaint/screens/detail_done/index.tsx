import { View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintDetailDoneScreenProps from "./type";

export default function ComplaintDetailDoneScreen({ navigation, route }: ComplaintDetailDoneScreenProps) {
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
