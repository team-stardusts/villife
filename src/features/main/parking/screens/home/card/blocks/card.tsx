import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { VehicleCardProps } from "../types";
import { Text, View } from "react-native";
import useVehicleCardViewStyles from "../styles";

export default function VehicleCard({ vehicle, cardWidth }: VehicleCardProps) {
    const messages = useScreenMessage();
    const styles = useVehicleCardViewStyles().card;
    /* console.log("ETA", vehicle.plate_number, vehicle.eta);
    console.log("ETD", vehicle.plate_number, vehicle.etd); */
    const etdHour = vehicle.etd.getUTCHours().toString();
    const etdMin = vehicle.etd.getUTCMinutes().toString();
    const etaHour = vehicle.eta.getUTCHours().toString();
    const etaMin = vehicle.eta.getUTCMinutes().toString();

    const cardData: Array<{ rowKey: string; rowValue: string }> = [
        {
            rowKey: messages.messages.words.plate_number,
            rowValue: vehicle.plate_number,
        },
        {
            rowKey: messages.messages.words.vehicle_info,
            rowValue: vehicle.model,
        },
        {
            rowKey: messages.messages.words.vehicle_arrival_time,
            rowValue: `${etaHour.length === 1 ? 0 + etaHour : etaHour}:${etaMin.length === 1 ? 0 + etaMin : etaMin}`,
        },
        {
            rowKey: messages.messages.words.vehicle_departure_time,
            rowValue: `${etdHour.length === 1 ? 0 + etdHour : etdHour}:${etdMin.length === 1 ? 0 + etdMin : etdMin}`,
        },
    ];

    return (
        <View style={[styles.card, { width: cardWidth }]}>
            <View style={styles.cardRowsWrapper}>
                {cardData.map((datum, index) => (
                    <CardRow styles={styles} key={index} rowKey={datum.rowKey} rowValue={datum.rowValue} />
                ))}
            </View>
        </View>
    );
}

function CardRow({
    styles,
    rowKey,
    rowValue,
}: {
    styles: ReturnType<typeof useVehicleCardViewStyles>["card"];
    rowKey: string;
    rowValue: string;
}) {
    return (
        <View style={styles.rowWrapper}>
            <Text style={styles.rowKey}>{rowKey}</Text>
            <Text style={styles.rowValue}>{rowValue}</Text>
        </View>
    );
}
