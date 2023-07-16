import { TouchableOpacity, View } from "react-native";
import BottomMessageSelectionModal from "./modal";
import { useState } from "react";
import useMessageSelectorStyles from "./styles";
import { MessageSelectionModalProps } from "./types";
import Icon from "../../../../common/atoms/icon";

export default function MessageSelectionModal(props: MessageSelectionModalProps) {
    const styles = useMessageSelectorStyles().main;
    const [isModalUnfold, setIsModalUnfold] = useState<boolean>(false);
    //const iconName = props.selectorType === "call" ? "phone" : "letter";

    return (
        <View style={styles.container}>
            <BottomMessageSelectionModal
                vehicleID={props.vehicleID}
                visible={isModalUnfold}
                setVisible={setIsModalUnfold}
                onMessageTypePress={console.log}
            />
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    setIsModalUnfold(true);
                }}
                style={styles.iconBox}>
                <Icon name="letter" size={styles.icon.width} color={styles.icon.color} />
            </TouchableOpacity>
        </View>
    );
}
