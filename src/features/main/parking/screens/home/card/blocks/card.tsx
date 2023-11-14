import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { VehicleCardProps } from "../types";
import { Text, View } from "react-native";
import useVehicleCardViewStyles from "../styles";

export default function VehicleCard({ vehicle, cardWidth }: VehicleCardProps) {
    const messages = useScreenMessage();
    const styles = useVehicleCardViewStyles().card;

    const etdHour = vehicle.etd.getHours().toString();
    const etdMin = vehicle.etd.getMinutes().toString();
    const etaHour = vehicle.eta.getHours().toString();
    const etaMin = vehicle.eta.getMinutes().toString();

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
            rowKey: messages.messages.words.vehicle_departure_time,
            rowValue: `${etdHour.length === 1 ? 0 + etdHour : etdHour}:${etdMin.length === 1 ? 0 + etdMin : etdMin}`,
        },
        {
            rowKey: messages.messages.words.vehicle_arrival_time,
            rowValue: `${etaHour.length === 1 ? 0 + etaHour : etaHour}:${etaMin.length === 1 ? 0 + etaMin : etaMin}`,
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
