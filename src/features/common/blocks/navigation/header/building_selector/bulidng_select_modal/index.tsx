import { Text, View } from "react-native";
import BottomSlidableModal from "../../../../universial/slidemodal_bottom";
import { BuildingSelectModalProps } from "./types";

export default function BuildingSelectModal(props: BuildingSelectModalProps) {
    return (
        <BottomSlidableModal modalVisible={props.visible} setModalVisible={props.setVisible} height={300}>
            <View>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
                <Text>TEST</Text>
            </View>
        </BottomSlidableModal>
    );
}
