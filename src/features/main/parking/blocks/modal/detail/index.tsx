import StardustModal from "../../../../../common/blocks/universial/stardust_modal";
import { Text, View } from "react-native";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import useVehicleDetailModalStyles from "./styles";
import { VehicleDetailAlertProps, VehicleDetailModalDate, VehicleKeyValuePair } from "./types";
import { StardustModalButton } from "../../../../../common/blocks/universial/stardust_modal/types";

export default function VehicleDetailModal(props: VehicleDetailAlertProps) {
    const messages = useScreenMessage().messages;
    const styles = useVehicleDetailModalStyles();
    const title =
        props.vehicle.ownerType === "guest"
            ? `${messages.words.guest} ${messages.words.info}`
            : `${messages.words.tenant} ${messages.words.info}`;
    const isMyGuest = props.vehicle.ownerType === "guest" && props.vehicle.room_number === props.userRoomNumber;

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
        if (props.vehicle.ownerType === "guest") {
            return [
                {
                    key: messages.words.visiting_date,
                    value: makeVehicleDetailModalDate(props.vehicle.eta).date,
                },
                {
                    key: messages.words.visiting_time,
                    value: makeVehicleDetailModalDate(props.vehicle.eta).time,
                },
                {
                    key: messages.words.vehicle_departure_date,
                    value: makeVehicleDetailModalDate(props.vehicle.etd).date,
                },
                {
                    key: messages.words.vehicle_departure_time,
                    value: makeVehicleDetailModalDate(props.vehicle.etd).time,
                },
                { key: messages.words.plate_number, value: props.vehicle.plate_number },
                {
                    key: messages.words.visiting_room_number,
                    value: props.vehicle.room_number.toString() + messages.words.room_postfix,
                },
                { key: messages.words.visiting_perpose, value: props.vehicle?.visiting_purpose || "-" },
            ];
        } else {
            return [
                { key: messages.words.plate_number, value: props.vehicle.plate_number },
                { key: messages.words.vehicle_model, value: props.vehicle.model },
                {
                    key: messages.words.vehicle_departure_time,
                    value: makeVehicleDetailModalDate(props.vehicle.etd).time,
                },
                {
                    key: messages.words.vehicle_arrival_time,
                    value: makeVehicleDetailModalDate(props.vehicle.eta).time,
                },
            ];
        }
    };

    const setButtons = (): StardustModalButton[] => {
        const buttons: StardustModalButton[] = [];

        if (isMyGuest) {
            buttons.push(
                {
                    text: messages.words.cancle,
                    onPress: () => props.setVisible(false),
                },
                {
                    text: messages.words.modify,
                    onPress: () => props.setVisible(false),
                }
            );
        } else {
            buttons.push({
                text: messages.words.okay,
                onPress: () => props.setVisible(false),
            });
        }

        return buttons;
    };

    return (
        <StardustModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            upperRightFunc={
                isMyGuest
                    ? {
                          icon: "trash-can",
                          onPress: () => console.log("HEY"),
                      }
                    : undefined
            }
            title={title}
            buttons={setButtons()}
            onPressVoidSpace={() => props.setVisible(false)}>
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
