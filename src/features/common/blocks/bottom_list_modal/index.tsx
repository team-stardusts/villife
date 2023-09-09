import { Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../universial/slidemodal_bottom";
import Icon from "../../atoms/icon";
import useListBottomSlidableModalStyles from "./styles";
import { ListBottomSlidableModalProps } from "./types";

export default function ListBottomSlidableModal(props: ListBottomSlidableModalProps) {
    const styles = useListBottomSlidableModalStyles();
    const rowHeight = (styles.row.height + styles.row.marginBottom) * 1.4;

    return (
        <BottomSlidableModal
            height={rowHeight * props.features.length + styles.container.marginBottom}
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}>
            <View style={styles.container}>
                {props.features.map((feature, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.row}
                        activeOpacity={0.6}
                        onPress={() => feature.onPress()}>
                        <View style={styles.iconBox}>
                            <Icon name={feature.icon} size={styles.icon.width} color={styles.icon.color} />
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.text}>{feature.text}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </BottomSlidableModal>
    );
}
