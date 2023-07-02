import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../../../../../common/atoms/icon";
import BottomSlidableModal from "../../../../../common/blocks/universial/slidemodal_bottom";
import useBottomSlideSelectorStyles from "../styles";
import { BottomMessageSelectionModalProps, MESSAGE_TYPE, MessageTypeComponentProps } from "./types";

export default function BottomMessageSelectionModal(props: BottomMessageSelectionModalProps) {
    const styles = useBottomSlideSelectorStyles().modal;
    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={styles.container.height}>
            <View style={styles.wrapper}>
                {Object.values(MESSAGE_TYPE).map((value, index) => (
                    <MessageTypeComponent key={index} messageType={value} onPress={() => console.log("Pressed")} />
                ))}
            </View>
        </BottomSlidableModal>
    );
}

function MessageTypeComponent(props: MessageTypeComponentProps) {
    const styles = useBottomSlideSelectorStyles().modalElement;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
                <View style={styles.iconBox}>
                    <Icon name="letter" size={styles.icon.width} color={styles.icon.color} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>{props.messageType}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
