import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../../../../../common/atoms/icon";
import BottomSlidableModal from "../../../../../common/blocks/universial/slidemodal_bottom";
import useBottomSlideSelectorStyles from "../styles";
import { BottomMessageSelectionModalProps, MESSAGE_TYPE, MessageTypeComponentProps } from "./types";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../../../../../common/router/types";

export default function BottomMessageSelectionModal(props: BottomMessageSelectionModalProps) {
    const styles = useBottomSlideSelectorStyles().modal;
    return (
        <BottomSlidableModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            height={styles.container.height}>
            <View style={styles.wrapper}>
                {Object.values(MESSAGE_TYPE).map((value, index) => (
                    <MessageTypeComponent
                        key={index}
                        messageType={value}
                        onPress={() => {
                            props.setVisible(false);
                        }}
                    />
                ))}
            </View>
        </BottomSlidableModal>
    );
}

function MessageTypeComponent(props: MessageTypeComponentProps) {
    const navigation = useNavigation<RouterParams["navigation"]>();
    const styles = useBottomSlideSelectorStyles().modalElement;
    const messages = useScreenMessage();

    const handlePress = () => {
        navigation.push("send_park_push_noti", {});

        props.onPress();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.wrapper} onPress={handlePress}>
                <View style={styles.iconBox}>
                    <Icon name="letter" size={styles.icon.width} color={styles.icon.color} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>
                        {props.messageType === "double_parking"
                            ? messages.messages.main.parking.message_selection_modal.double_parking
                            : messages.messages.main.parking.message_selection_modal.change_request}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
