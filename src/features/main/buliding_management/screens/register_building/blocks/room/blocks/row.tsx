import { useState } from "react";
import { FloorSetterRowProps } from "../types";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../../../../../../../common/blocks/universial/slidemodal_bottom";
import NumberPicker from "../../../../../../../common/atoms/time_picker/number_picker";
import Icon from "../../../../../../../common/atoms/icon";

export default function FloorSetterRow({ styles, floor }: FloorSetterRowProps) {
    const [rooms, setRooms] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <View style={styles.rowContaier}>
            <RoomsSettingModal modalVisible={visible} setModalVisible={setVisible} />
            <View style={styles.floorBox}>
                <Text style={styles.rowText}>{floor}층</Text>
            </View>
            <View style={styles.roomBox}>
                <View style={styles.roomsWrapper}>
                    <Text style={styles.rowText}>{rooms}호</Text>
                </View>
            </View>
            <View style={styles.blankBox}>
                <View style={styles.roomsSettingBtnWrapper}>
                    <TouchableOpacity
                        style={styles.roomsSettingBtn}
                        activeOpacity={0.5}
                        onPress={() => {
                            console.log("SET");
                            setVisible(true);
                        }}>
                        <Icon
                            name="arrow-down"
                            size={styles.roomsSettingIcon.width}
                            color={styles.roomsSettingIcon.color}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

type RoomsSettingModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function RoomsSettingModal(props: RoomsSettingModalProps) {
    return (
        <BottomSlidableModal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible} height={300}>
            <ScrollView style={{ marginBottom: 30, width: "100%" }} onTouchEnd={() => console.log("sadf")}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
                    <TouchableOpacity key={num} style={{ marginHorizontal: 20, height: 50, alignItems: "center" }}>
                        <Text>{num}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </BottomSlidableModal>
    );
}
