import { StyleSheet, View } from "react-native";
import BottomSlidableModal from "../../../../../../../common/blocks/universial/slidemodal_bottom";
import { RoomsSettingModalProps } from "../types";
import ElementPicker from "../../../../../../../common/atoms/element_picker";
import useStyler from "../../../../../../../common/hooks/styler/hooks";

export default function RoomsSettingModal(props: RoomsSettingModalProps) {
    const styles = useRoomsSettingModalStyles();
    const roomRange = Array.from({ length: 51 }, (_, k) => k);

    return (
        <BottomSlidableModal
            height={styles.modal.height}
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}>
            <View style={styles.container}>
                <ElementPicker
                    width={styles.picker.width}
                    nodes={roomRange}
                    initialIndex={roomRange.indexOf(props.initialRooms)}
                    numberOfElementsToShow={9}
                    focusedcolor={styles.focusedElement.color}
                    unFocusedColor={styles.unfocusedElement.color}
                    onNodeChange={props.onChangeRoomCount}
                />
            </View>
        </BottomSlidableModal>
    );
}

function useRoomsSettingModalStyles() {
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
