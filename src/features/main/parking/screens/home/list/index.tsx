import { View, ActivityIndicator, Text } from "react-native";
import useVehicleListStyles from "./styles";
import { VehicleListViewProps } from "./types";
import TitleCard from "../../../../../common/blocks/title_card";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../common/router/types";
import useUserInformation from "../../../../../common/hooks/service/user_info";
import VehicleInfoRow from "./blocks/row";
import Icon from "../../../../../common/atoms/icon";

export default function VehicleListView(props: VehicleListViewProps) {
    const styles = useVehicleListStyles();
    const messages = useScreenMessage().messages;
    const navigation = useNavigation<VillifeNavigation>();
    const user = useUserInformation();

    const getUserRoomNumber = (): number | undefined => {
        return user?.roomNumber;
    };

    return (
        <View style={styles.main.container}>
            <TitleCard
                title={messages.main.parking.home.villa_vehicle_info}
                headerButton={{
                    title: "방문자 등록하기",
                    onPress: () => navigation.navigate("register_guest_vehicle"),
                }}>
                <View style={styles.main.wrapper}>
                    {/* <VehicleListBodyView styles={styles.body} vehicles={props.vehicles} /> */}
                    {props.vehicles.length !== 0 ? (
                        props.vehicles.map((vehicle, index) => {
                            return (
                                <VehicleInfoRow
                                    key={index}
                                    isAdmin={user?.isAdmin ?? false}
                                    userRoomNumber={getUserRoomNumber()}
                                    styles={styles.row}
                                    messages={messages}
                                    vehicle={vehicle}
                                />
                            );
                        })
                    ) : (
                        <View style={styles.main.whenEmpty}>
                            <Text style={styles.main.whenEmptyCardText}>등록된 차량이 없어요!</Text>
                            <View style={{ alignContent: "center" }}>
                                <Icon name="illustration_car" size={8} />
                            </View>
                        </View>
                    )}
                </View>
            </TitleCard>
        </View>
    );
}
