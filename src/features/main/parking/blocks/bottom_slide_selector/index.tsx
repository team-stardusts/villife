import { TouchableOpacity, View } from "react-native";
import BottomMessageSelectionModal from "./message_selection_modal";
import { useState } from "react";
import useBottomSlideSelectorStyles from "./styles";
import { BottomSlideSelectorProps } from "./types";
import Icon from "../../../../common/atoms/icon";

export default function BottomSlideSelector(props: BottomSlideSelectorProps) {
    const styles = useBottomSlideSelectorStyles().main;
    const [isModalUnfold, setIsModalUnfold] = useState<boolean>(false);
    const iconName = props.selectorType === "call" ? "phone" : "letter";

    return (
        <View style={styles.container}>
            <BottomMessageSelectionModal
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
                <Icon name={iconName} size={styles.icon.width} color={styles.icon.color} />
            </TouchableOpacity>
        </View>
    );
}
