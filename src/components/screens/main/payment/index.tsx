import { Button, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import NavigationView from "../../../blocks/navigation";
import PaymentScreenProps from "./type";

export default function PaymentScreen({ navigation, route }: PaymentScreenProps) {
    const messages = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.payment.screen_title,
            }}>
            <View></View>
        </NavigationView>
    );
}
