import { View } from "react-native";
import { InfoEditViewProps } from "../types";
import VehicleInfoInputBox from "../../../../screens/register_vehicle/blocks/input_box";
import { useEffect, useState } from "react";
import { VehicleInfo } from "../../../../screens/register_vehicle/blocks/input_box/types";

export default function InfoEditView(props: InfoEditViewProps) {
    const [info, setInfo] = useState<VehicleInfo>({
        plateNumber: "",
        model: "",
    });

    useEffect(() => {
        props.onChangeInfo(info);
    }, [info]);

    return (
        <View style={props.styles.infoContianer}>
            <VehicleInfoInputBox initialVehicleInfo={props.initialnfo} onChangeVehicleInfo={setInfo} />
        </View>
    );
}
