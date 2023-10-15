import { StyleSheet, View } from "react-native";
import BottomSlidableModal from "../../universial/slidemodal_bottom";
import ElementPicker from "../../../atoms/element_picker";
import useStyler from "../../../hooks/styler/hooks";
import { HorizontalNumberPickingModalProps } from "./types";

export default function HorizontalNumberPickingModal(props: HorizontalNumberPickingModalProps) {
    const styles = useHorizontalNumberPickingModalStyles();

    return (
        <BottomSlidableModal
            height={styles.modal.height}
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}>
            <View style={styles.container}>
                <ElementPicker
                    width={styles.picker.width}
                    nodes={props.numbersRange}
                    initialIndex={
                        props.initialIndex &&
                        props.initialIndex >= 0 &&
                        props.initialIndex <= props.numbersRange.length - 1
                            ? props.initialIndex
                            : 0
                    }
                    numberOfElementsToShow={9}
                    focusedcolor={styles.focusedElement.color}
                    unFocusedColor={styles.unfocusedElement.color}
                    onNodeChange={props.onChangeNumber}
                />
            </View>
        </BottomSlidableModal>
    );
}

function useHorizontalNumberPickingModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        modal: {
            height: deviceUI.moderateScale(150),
        },
        container: {
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: deviceUI.moderateScale(40),
        },
        picker: {
            width: deviceUI.moderateScale(400),
        },
        focusedElement: {
            color: theme.color.specified.blue,
        },
        unfocusedElement: {
            color: theme.color.series.grey.level3,
        },
    });
}
