import { Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import RegisterVehicleScreenProps from "./types";
import ContentBox from "../../../../common/blocks/content_box";
import useRegisterVehicleScreenStyles from "./styles";
import ParkingScreenGuide from "../../blocks/screen_guide";

export default function RegisterVehicleScreen({ navigation, route }: RegisterVehicleScreenProps) {
    const messages = useScreenMessage();
    const styles = useRegisterVehicleScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.register_home.screen_title,
            }}>
            <View style={styles.toplevelBox}>
                <ParkingScreenGuide
                    title={messages.messages.main.parking.register_home.register_own_vehicle}
                    subtitle={messages.messages.main.parking.register_home.request_input_vehicle_info}
                />
                <View style={{ height: 200 }}>
                    <ContentBox>
                        <View>
                            <Text>Hello, world!</Text>
                        </View>
                    </ContentBox>
                </View>
                <View>
                    <View>
                        <Text>{messages.messages.words.plate_number}</Text>
                    </View>
                </View>
            </View>
        </NavigationView>
    );
}
