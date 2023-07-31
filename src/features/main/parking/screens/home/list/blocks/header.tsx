import { Text, TouchableOpacity, View } from "react-native";
import { VehicleListHeaderViewProps } from "../types";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import MultilingualMessage from "../../../../../../common/hooks/multilingual";
import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../../../../../../common/router/types";

export default function VehicleListHeaderView({ styles }: VehicleListHeaderViewProps) {
    const messages = useScreenMessage().messages;
    const navigation = useNavigation<RouterParams["navigation"]>();

    const handlePressRegisterBtn = (type: VehicleRegisterBtnProps["type"]) => {
        if (type === "own") navigation.navigate("register_vehicle");
        else navigation.navigate("register_guest_vehicle");
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>{messages.main.parking.home.villa_vehicle_info}</Text>
            </View>
            <View style={styles.modifyBox}>
                <VehicleRegisterBtn styles={styles} messages={messages} type="own" onPress={handlePressRegisterBtn} />
                <VehicleRegisterBtn styles={styles} messages={messages} type="guest" onPress={handlePressRegisterBtn} />
            </View>
        </View>
    );
}

function VehicleRegisterBtn({ styles, messages, type, onPress }: VehicleRegisterBtnProps) {
    return (
        <TouchableOpacity style={styles.modifyBtn} activeOpacity={0.5} onPress={() => onPress(type)}>
            <Text style={styles.modifyBtnTitle}>
                {type === "own"
                    ? messages.main.parking.home.register_own_car
                    : messages.main.parking.home.register_guest}
            </Text>
        </TouchableOpacity>
    );
}

type VehicleRegisterBtnProps = {
    styles: VehicleListHeaderViewProps["styles"];
    messages: MultilingualMessage["messages"];
    type: "own" | "guest";
    onPress(type: VehicleRegisterBtnProps["type"]): void;
};
