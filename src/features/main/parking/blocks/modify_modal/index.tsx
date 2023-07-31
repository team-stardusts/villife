import { View } from "react-native";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import { Vehicle } from "../../services/states/types";
import { EtdaTime } from "../etad_time_picker/types";
import { VehicleModifyModalProps } from "./types";
import EtdaEditView from "./blocks/etda";
import useVehicleModifyModalStyles from "./styles";
import InfoEditView from "./blocks/info";
import { VehicleInfo } from "../vehicle_info_input_box/types";
import useParkService from "../../services/park";
import { useState } from "react";

export default function VehicleModifyModal(props: VehicleModifyModalProps) {
    const messages = useScreenMessage();
    const initialEtda = convertVehicleEtdaToEtdaTime(props.vehilce);
    const styles = useVehicleModifyModalStyles();
    const { updateUserVehicleEtda, updateUserVehicleInfo } = useParkService();
    const [etda, setEtda] = useState<EtdaTime | null>(null);
    const [info, setInfo] = useState<VehicleInfo | null>(null);

    const handlePressModifyBtn = () => {
        if (props.modifyType === "etda" && etda !== null) {
            updateUserVehicleEtda({
                vehicleID: props.vehilce.id,
                etda: etda,
            });
        } else if (info !== null) {
            updateUserVehicleInfo({
                vehicleID: props.vehilce.id,
                ...info,
            });
        }

        props.setVisible(false);
    };

    return (
        <StardustAlert
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            title={messages.messages.main.parking.home.modify_vehicle_info}
            subtitle={messages.messages.main.parking.home.request_to_modify_etda}
            leftButtonText={messages.messages.words.cancle}
            rightButtonText={messages.messages.words.modified}
            onPressVoidSpace={() => props.setVisible(false)}
            onPressLeftBtn={() => props.setVisible(false)}
            onPressRightBtn={handlePressModifyBtn}>
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
        </StardustAlert>
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
