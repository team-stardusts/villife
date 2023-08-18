import StardustModal from "../../../../common/blocks/universial/stardust_modal";
import { Text, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useVehicleDetailModalStyles from "./styles";
import { VehicleDetailAlertProps, VehicleDetailModalDate, VehicleKeyValuePair } from "./types";

export default function VehicleDetailModal(props: VehicleDetailAlertProps) {
    const messages = useScreenMessage().messages;
    const styles = useVehicleDetailModalStyles();
    const title =
        props.vehicle.ownerType === "guest"
            ? `${messages.words.guest} ${messages.words.info}`
            : `${messages.words.tenant} ${messages.words.info}`;
    /* const subtitle = props.vehicle.ownerType === "guest" && props.vehicle.room_number === props.userRoomNumber ? 
    "정보 확인 후 " */

    const makeVehicleDetailModalDate = (date: Date): VehicleDetailModalDate => {
        const keepDoubleDigits = (num: number): string => {
            if (num >= 10) {
                return num.toString();
            }

            return "0" + num.toString();
        };
        const months = keepDoubleDigits(date.getMonth());
        const days = keepDoubleDigits(date.getDay());
        const hours = keepDoubleDigits(date.getHours());
        const mins = keepDoubleDigits(date.getMinutes());

        return {
            date: `${months}-${days}`,
            time: `${hours}:${mins}`,
        };
    };

    const makeVehicleKeyValuePairs = (): VehicleKeyValuePair[] => {
        const pairs: VehicleKeyValuePair[] = [];

        if (props.vehicle.ownerType === "guest") {
            pairs.push({
                key: messages.words.visiting_date,
                value: makeVehicleDetailModalDate(props.vehicle.eta).date,
            });
            pairs.push({
                key: messages.words.visiting_time,
                value: makeVehicleDetailModalDate(props.vehicle.eta).time,
            });
            pairs.push({
                key: messages.words.vehicle_departure_date,
                value: makeVehicleDetailModalDate(props.vehicle.etd).date,
            });
            pairs.push({
                key: messages.words.vehicle_departure_time,
                value: makeVehicleDetailModalDate(props.vehicle.etd).time,
            });
            pairs.push({ key: messages.words.plate_number, value: props.vehicle.plate_number });
            pairs.push({
                key: messages.words.visiting_room_number,
                value: props.vehicle.room_number.toString() + messages.words.room_postfix,
            });
            pairs.push({ key: messages.words.visiting_perpose, value: props.vehicle?.visiting_perpose || "-" });
        } else {
            pairs.push({ key: messages.words.plate_number, value: props.vehicle.plate_number });
            pairs.push({ key: messages.words.vehicle_model, value: props.vehicle.model });
            pairs.push({
                key: messages.words.vehicle_departure_time,
                value: makeVehicleDetailModalDate(props.vehicle.etd).time,
            });
            pairs.push({
                key: messages.words.vehicle_arrival_time,
                value: makeVehicleDetailModalDate(props.vehicle.eta).time,
            });
        }

        return pairs;
    };

    return (
        <StardustModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            title={title}
            leftButtonText={messages.words.cancle}
            rightButtonText={messages.words.okay}
            onPressVoidSpace={() => props.setVisible(false)}
            onPressLeftBtn={() => props.setVisible(false)}
            onPressRightBtn={() => console.log("right")}>
            <View style={styles.container}>
                {makeVehicleKeyValuePairs().map((pair, index) => {
                    return (
                        <View key={index} style={styles.row}>
                            <Text style={styles.key}>{pair.key}</Text>
                            <Text style={styles.value}>{pair.value}</Text>
                        </View>
                    );
                })}
            </View>
        </StardustModal>
    );
}
