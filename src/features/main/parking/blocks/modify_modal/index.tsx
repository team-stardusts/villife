import { View } from "react-native";
import StardustModal from "../../../../common/blocks/universial/stardust_modal";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { Vehicle } from "../../services/states/types";
import { EtdaTime } from "../etad_time_picker/types";
import { VehicleModifyModalProps } from "./types";
import EtdaEditView from "./blocks/etda";
import useVehicleModifyModalStyles from "./styles";
import InfoEditView from "./blocks/info";
import { VehicleInfo } from "../vehicle_info_input_box/types";
import useParkService from "../../services/park";
import { useCallback, useState } from "react";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";

export default function VehicleModifyModal(props: VehicleModifyModalProps) {
    const messages = useScreenMessage();
    const initialEtda = convertVehicleEtdaToEtdaTime(props.vehilce);
    const styles = useVehicleModifyModalStyles();
    const { updateUserVehicleEtda, updateUserVehicleInfo } = useParkService();
    const [etda, setEtda] = useState<EtdaTime | null>(null);
    const [info, setInfo] = useState<VehicleInfo | null>(null);
    const [alert, setAlert] = useState<StardustAlertContent>({
        visible: false,
        //setVisible: setAlertVisible,
        title: "",
        buttons: [{ text: messages.messages.words.okay, onPress: () => props.setVisible(false) }],
    });

    const handlePressModifyBtn = useCallback(async () => {
        if (props.modifyType === "etda" && etda !== null) {
            const isSuccessful = await updateUserVehicleEtda({
                vehicleID: props.vehilce.id,
                etda: etda,
            });

            setAlert({
                ...alert,
                visible: true,
                title: isSuccessful
                    ? messages.messages.main.parking.modify_modal.succed_to_change_etda
                    : messages.messages.main.parking.modify_modal.fail_to_change_etda,
                type: isSuccessful ? "info" : "error",
            });
        } else if (info !== null) {
            const isSuccessful = await updateUserVehicleInfo({
                vehicleID: props.vehilce.id,
                ...info,
            });

            setAlert({
                ...alert,
                visible: true,
                title: isSuccessful
                    ? messages.messages.main.parking.modify_modal.succed_to_change_info
                    : messages.messages.main.parking.modify_modal.fail_to_change_info,
                type: isSuccessful ? "info" : "error",
            });
        }
    }, [etda, info]);

    const selectModifyBtnColor = useCallback(() => {
        if (props.modifyType === "etda") return styles.successBtn.color;

        return styles.warningBtn.color;
    }, [etda, info]);

    return (
        <>
            <StardustModal
                modalVisible={props.visible}
                setModalVisible={props.setVisible}
                title={messages.messages.main.parking.home.modify_vehicle_info}
                subtitle={messages.messages.main.parking.home.request_to_modify_etda}
                buttons={[
                    {
                        text: messages.messages.words.cancle,
                        onPress: () => props.setVisible(false),
                    },
                    {
                        text: messages.messages.words.modified,
                        color: selectModifyBtnColor(),
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
                <StardustAlert setAlert={setAlert} {...alert} />
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
