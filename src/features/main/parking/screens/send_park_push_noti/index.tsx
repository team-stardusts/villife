import { Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import SendParkPushNotiScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ParkingScreenGuide from "../../blocks/screen_guide";

export default function SendParkPushNotiScreen({ navigation, route }: SendParkPushNotiScreenProps) {
    const messages = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.send_park_push_noti.screen_title,
            }}>
            <View>
                <ParkingScreenGuide
                    title={messages.messages.main.parking.send_park_push_noti.screen_title}
                    subtitle={messages.messages.main.parking.send_park_push_noti.request_to_send_park_noti}
                />
            </View>
        </NavigationView>
    );
}
