import { View } from "react-native";
import useVehicleListStyles from "./styles";
import VehicleListBodyView from "./blocks/body";
import { VehicleListViewProps } from "./types";
import TitleCard from "../../../../../common/blocks/title_card";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";

export default function VehicleListView(props: VehicleListViewProps) {
    const styles = useVehicleListStyles();
    const messages = useScreenMessage().messages;
    const navigation = useNavigation<VillifeNavigation>();

    return (
        <View style={styles.main.container}>
            <TitleCard
                title={messages.main.parking.home.villa_vehicle_info}
                headerButton={{
                    title: "방문자 등록하기",
                    onPress: () => navigation.navigate("register_guest_vehicle"),
                }}>
                <View style={styles.main.wrapper}>
                    <VehicleListBodyView styles={styles.body} vehicles={props.vehicles} />
                </View>
            </TitleCard>
        </View>
    );
}
