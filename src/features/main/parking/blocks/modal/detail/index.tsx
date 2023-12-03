import StardustModal from "../../../../../common/blocks/universial/stardust_modal";
import { Text, View } from "react-native";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import useVehicleDetailModalStyles from "./styles";
import { VehicleDetailAlertProps, VehicleDetailModalDate, VehicleKeyValuePair } from "./types";
import useParkingLot from "../../../services/parking_lot";
import VillifeToastMessage from "../../../../../common/atoms/toast";
import StardustAlert from "../../../../../common/blocks/universial/stardust_alert";
import { useState } from "react";
import { StardustAlertContent } from "../../../../../common/blocks/universial/stardust_alert/types";

export default function VehicleDetailModal(props: VehicleDetailAlertProps) {
    const messages = useScreenMessage().messages;
    const styles = useVehicleDetailModalStyles();
    const parkingLot = useParkingLot();
    const [deleteAlert, setDeleteAlert] = useState<StardustAlertContent>({
        visible: false,
        title: messages.boilerplate.are_you_sure_to_delete,
        message: messages.boilerplate.deleted_info_cant_be_recovered,
        type: "warning",
        buttons: [
            {
                text: messages.words.cancle,
                onPress: (): void => setDeleteAlert({ ...deleteAlert, visible: false }),
            },
            {
                text: messages.words.delete,
                onPress: (): Promise<void> => deleteVehicle(),
            },
        ],
    });

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

        //console.log(props.vehicle.ownerType, props.vehicle.plate_number, date);

        // getUCT*로 시작하지 않을 시 GMT+9로 변환됨. 이미 변환된 상태라 변환되면 안됨
        const months = keepDoubleDigits(date.getUTCMonth() + 1); // month는 0부터 시작
        const days = keepDoubleDigits(date.getUTCDate());
        const hours = keepDoubleDigits(date.getUTCHours());
        const mins = keepDoubleDigits(date.getUTCMinutes());

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
                    key: messages.words.vehicle_arrival_time,
                    value: makeVehicleDetailModalDate(props.vehicle.eta).time,
                },
                {
                    key: messages.words.vehicle_departure_time,
                    value: makeVehicleDetailModalDate(props.vehicle.etd).time,
                },
            ];
        }
    };

    const deleteVehicle = async () => {
        const isSuccessful = await parkingLot.deleteVehicle({
            type: "guest",
            vehicleID: props.vehicle.id,
        });

        props.setVisible(false);

        VillifeToastMessage.showBottomToast(
            isSuccessful ? "success" : "error",
            isSuccessful
                ? messages.main.parking.detail_modal.success_to_delete
                : messages.main.parking.detail_modal.failed_to_delete
        );
    };

    return (
        <StardustModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            upperRightFunc={
                isMyGuest
                    ? {
                          icon: "trash-can",
                          onPress: () => setDeleteAlert({ ...deleteAlert, visible: true }),
                      }
                    : undefined
            }
            title={title}
            buttons={[
                {
                    text: messages.words.okay,
                    onPress: () => props.setVisible(false),
                },
            ]}
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
            <StardustAlert {...deleteAlert} setAlert={setDeleteAlert} />
        </StardustModal>
    );
}
