import { View } from "react-native";
import { InfoEditViewProps } from "../types";
import VehicleInfoInputBox from "../../../info_input_box";
import { useEffect, useState } from "react";
import { VehicleInfo, VehicleValidationResult } from "../../../info_input_box/types";

export default function InfoEditView(props: InfoEditViewProps) {
    const [info, setInfo] = useState<VehicleInfo>({
        plateNumber: "",
        model: "",
    });
    const [_, setValid] = useState<VehicleValidationResult>({
        plateNumber: false,
        model: false,
    });

    useEffect(() => {
        props.onChangeInfo(info);
    }, [info]);

    return (
        <View style={props.styles.infoContianer}>
            <VehicleInfoInputBox
                initialVehicleInfo={props.initialnfo}
                onValidation={setValid}
                onChangeVehicleInfo={setInfo}
            />
        </View>
    );
}
