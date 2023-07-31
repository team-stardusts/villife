import { View } from "react-native";
import { EtdaEditViewProps } from "../types";
import EtdaTimePicker from "../../etad_time_picker";

export default function EtdaEditView(props: EtdaEditViewProps) {
    return (
        <View style={props.styles.editContianer}>
            <EtdaTimePicker initialTime={props.initialEtda} onTimeChange={props.onChangeEtda} />
        </View>
    );
}
