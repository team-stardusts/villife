import { TouchableHighlight, View } from "react-native";
import useTimeSelectionModalStyles from "./styles";
import { TimeSelectionModalProps } from "./types";
import BottomSlidableModal from "../../../../common/blocks/universial/slidemodal_bottom";
import TimePicker from "../../../../common/atoms/time_picker";
import NumberPicker from "../../../../common/atoms/time_picker/number_picker";
import EtdaTimePicker from "../etad_time_picker";

export default function TimeSelectionModal(props: TimeSelectionModalProps) {
    const styles = useTimeSelectionModalStyles(props.height);

    return (
        <BottomSlidableModal modalVisible={props.visible} setModalVisible={props.setVisible} height={props.height}>
            <View style={styles.container}>
                <EtdaTimePicker />
            </View>
        </BottomSlidableModal>
    );
}
