import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../../../../../common/blocks/universial/slidemodal_bottom";
import ElementPicker from "../../../../../common/atoms/element_picker";
import { PaidDateRange, SelectedDate } from "../types";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { useEffect, useState } from "react";

export default function SelectModal(props: SelectModalProps) {
    const styles = useSelectModalStyles();

    return (
        <BottomSlidableModal
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}
            height={styles.container.height}>
            <View style={styles.wrapper}>
                <Picker paidDateRange={props.paidDateRange} />
            </View>
        </BottomSlidableModal>
    );
}

function Picker(props: PickerProps) {
    const styles = useSelectModalStyles();
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);

    useEffect(() => {
        const paidDR = props.paidDateRange;

        const keys = Object.keys(paidDR);
        if (keys.length === 0) return;

        try {
            const year = parseInt(keys[keys.length - 1]);
            const month = paidDR[year][paidDR[year].length - 1];
            setSelectedDate({
                year: parseInt(keys[keys.length - 1]),
                month: month,
            });
        } catch (e) {
            console.error("Faild to parse management fee detail's date range.");
        }
    }, []);

    return (
        <View style={styles.pickerContainer}>
            <ScrollView style={styles.selectBox}>
                {Object.keys(props.paidDateRange).map((year, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            setSelectedDate({
                                ...selectedDate,
                                year: year,
                                month: props.paidDateRange[year][props.paidDateRange[year].length - 1],
                            })
                        }>
                        <Text>{year}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <ScrollView style={styles.selectBox}>
                {selectedDate &&
                    props.paidDateRange[selectedDate.year].map((month, index) => (
                        <TouchableOpacity key={index}>
                            <Text>{month}</Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
}

function useSelectModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            height: deviceUI.getScreenSize().height * 0.4,
        },
        wrapper: {
            height: "100%",
            width: "100%",
            justifyContent: "center",
        },
        pickerContainer: {
            flexDirection: "row",
            justifyContent: "center",
        },
        selectBox: {},
    });
}

type PickerProps = {
    paidDateRange: PaidDateRange;
};

type SelectModalProps = PickerProps & {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
