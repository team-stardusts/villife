import { View } from "react-native";
import StardustModal from "../../../../../common/blocks/universial/stardust_modal";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { Vehicle } from "../../../services/states/types";
import { EtdaTime } from "../../etad_time_picker/types";
import { VehicleModifyModalProps } from "./types";
import EtdaEditView from "./blocks/etda";
import useVehicleModifyModalStyles from "./styles";
import InfoEditView from "./blocks/info";
import { VehicleInfo } from "../../info_input_box/types";
import useParkingLot from "../../../services/parking_lot";
import { useCallback, useState } from "react";
import StardustAlert from "../../../../../common/blocks/universial/stardust_alert";
import { StardustAlertContent } from "../../../../../common/blocks/universial/stardust_alert/types";
import VillifeToastMessage from "../../../../../common/atoms/toast";

export default function VehicleModifyModal(props: VehicleModifyModalProps) {
    const messages = useScreenMessage();
    const initialEtda = convertVehicleEtdaToEtdaTime(props.vehilce);
    const styles = useVehicleModifyModalStyles();
    const parkingLot = useParkingLot();
    const [etda, setEtda] = useState<EtdaTime | null>(null);
    const [info, setInfo] = useState<VehicleInfo | null>(null);
    const [deleteAlert, setDeleteAlert] = useState<StardustAlertContent>({
        visible: false,
        title: messages.messages.boilerplate.are_you_sure_to_delete,
        message: messages.messages.boilerplate.deleted_info_cant_be_recovered,
        type: "warning",
        buttons: [
            {
                text: messages.messages.words.cancle,
                onPress: (): void => setDeleteAlert({ ...deleteAlert, visible: false }),
            },
            {
                text: messages.messages.words.delete,
                onPress: (): Promise<void> => deleteVehicle(),
            },
        ],
    });

    const handlePressModifyBtn = useCallback(async () => {
        if (props.modifyType === "etda" && etda !== null) {
            const isSuccessful = await parkingLot.updateUserVehicleEtda({
                vehicleID: props.vehilce.id,
                etda: etda,
            });

            props.setVisible(false);

            VillifeToastMessage.showBottomToast(
                isSuccessful ? "success" : "error",
                isSuccessful
                    ? messages.messages.main.parking.modify_modal.succed_to_change_etda
                    : messages.messages.main.parking.modify_modal.fail_to_change_etda
            );
        } else if (info !== null) {
            const isSuccessful = await parkingLot.updateUserVehicleInfo({
                vehicleID: props.vehilce.id,
                ...info,
            });

            props.setVisible(false);

            VillifeToastMessage.showBottomToast(
                isSuccessful ? "success" : "error",
                isSuccessful
                    ? messages.messages.main.parking.modify_modal.succed_to_change_info
                    : messages.messages.main.parking.modify_modal.fail_to_change_info
            );
        }
    }, [etda, info]);

    /* const selectModifyBtnColor = useCallback(() => {
        if (props.modifyType === "etda") return styles.successBtn.color;

        return styles.warningBtn.color;
    }, [etda, info]); */

    const deleteVehicle = async (): Promise<void> => {
        const isSuccessful = await parkingLot.deleteVehicle({
            type: "user",
            vehicleID: props.vehilce.id,
        });

        props.setVisible(false);
        setDeleteAlert({ ...deleteAlert, visible: false });

        VillifeToastMessage.showBottomToast(
            isSuccessful ? "success" : "error",
            isSuccessful
                ? messages.messages.main.parking.modify_modal.success_to_delete
                : messages.messages.main.parking.modify_modal.failed_to_delete
        );
    };

    return (
        <>
            <StardustModal
                modalVisible={props.visible}
                setModalVisible={props.setVisible}
                upperRightFunc={
                    props.modifyType === "info"
                        ? {
                              icon: "trash-can",
                              onPress: () => setDeleteAlert({ ...deleteAlert, visible: true }),
                          }
                        : undefined
                }
                title={messages.messages.main.parking.home.modify_vehicle_info}
                subtitle={messages.messages.main.parking.home.request_to_modify_etda}
                buttons={[
                    {
                        text: messages.messages.words.cancle,
                        onPress: () => props.setVisible(false),
                    },
                    {
                        text: messages.messages.words.modified,
                        color: styles.modifyBtn.color,
                        onPress: () => handlePressModifyBtn(),
                    },
                ]}
                onPressVoidSpace={() => props.setVisible(false)}>
                <View style={styles.container}>
                    {props.modifyType === "etda" ? (
                        <EtdaEditView styles={styles} initialEtda={initialEtda} onChangeEtda={setEtda} />
                    ) : (
                        <InfoEditView
                            styles={styles}
                            initialnfo={{
                                plateNumber: props.vehilce.plate_number,
                                model: props.vehilce.model,
                            }}
                            onChangeInfo={setInfo}
                        />
                    )}
                </View>
                <StardustAlert setAlert={setDeleteAlert} {...deleteAlert} />
            </StardustModal>
        </>
    );
}

function convertVehicleEtdaToEtdaTime(vehicle: Vehicle): EtdaTime {
    return {
        etd: {
            hour: vehicle.etd.getHours(),
            minute: vehicle.etd.getMinutes(),
        },
        eta: {
            hour: vehicle.eta.getHours(),
            minute: vehicle.eta.getMinutes(),
        },
    };
}
