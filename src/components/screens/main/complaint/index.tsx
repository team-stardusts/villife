import { Button, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import NavigationView from "../../../blocks/navigation";
import ComplaintScreenProps from "./type";

export default function ComplaintScreen({ navigation, route }: ComplaintScreenProps) {
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
