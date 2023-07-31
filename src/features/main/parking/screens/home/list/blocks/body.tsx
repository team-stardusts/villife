import { Text, View } from "react-native";
import { VehicleListBodyViewProps } from "../types";
import Badge from "../../../../../../common/atoms/badge";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import useVehicleListStyles from "../styles";
import MultilingualMessage from "../../../../../../common/hooks/multilingual";
import { Vehicle } from "../../../../services/states/types";

export default function VehicleListBodyView(props: VehicleListBodyViewProps) {
    const messages = useScreenMessage().messages;

    return (
        <View>
            {props.vehicles.map((vehicle, index) => {
                return <VehicleInfoRow key={index} styles={props.styles} messages={messages} vehicle={vehicle} />;
            })}
        </View>
    );
}

type VehicleInfoRowProps = {
    styles: ReturnType<typeof useVehicleListStyles>["body"];
    messages: MultilingualMessage["messages"];
    vehicle: Vehicle;
};

function VehicleInfoRow(props: VehicleInfoRowProps) {
    const badgeTitle =
        props.vehicle.ownerType !== "guest" ? props.vehicle.room_number.toString() : props.messages.words.visit;
    const badgeStyle = props.vehicle.ownerType !== "guest" ? props.styles.tenantBadge : props.styles.guestBadge;

    return (
        <View style={props.styles.container}>
            <View style={props.styles.vehicleInfoBox}>
                <Badge
                    title={badgeTitle}
                    size={badgeStyle.width}
                    color={badgeStyle.color}
                    bgColor={badgeStyle.backgroundColor}
                />
                <Text style={props.styles.plateNumber}>{props.vehicle.plate_number}</Text>
            </View>
        </View>
    );
}
