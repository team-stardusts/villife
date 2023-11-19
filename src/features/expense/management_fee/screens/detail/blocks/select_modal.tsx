import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSlidableModal from "../../../../../common/blocks/universial/slidemodal_bottom";
import { PaidDateRange, SelectedDate } from "../types";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { useEffect, useState } from "react";
import Icon from "../../../../../common/atoms/icon";

export default function SelectModal(props: SelectModalProps) {
    const styles = useSelectModalStyles();

    return (
        <BottomSlidableModal
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}
            height={styles.container.height}>
            <View style={styles.wrapper}>
                <Picker
                    initailSelectedDate={props.initailSelectedDate}
                    paidDateRange={props.paidDateRange}
                    onPick={(selectedDate) => {
                        props.setModalVisible(false);
                        props.onPick(selectedDate);
                    }}
                />
            </View>
        </BottomSlidableModal>
    );
}

function Picker(props: PickerProps) {
    const styles = useSelectModalStyles();
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const NOT_SELECTED_MONTH = 0;

    useEffect(() => {
        const paidDR = props.paidDateRange;

        const keys = Object.keys(paidDR);
        if (keys.length === 0) return;

        try {
            const year = parseInt(keys[keys.length - 1]);

            setSelectedDate({
                year: year,
                month: NOT_SELECTED_MONTH,
            });
        } catch (e) {
            console.error("Faild to parse management fee detail's date range.");
        }
    }, []);

    useEffect(() => {
        if (selectedDate === null) return;

        setSelectedDate({
            ...selectedDate,
            month: NOT_SELECTED_MONTH,
        });
    }, [selectedDate?.year]);

    useEffect(() => {
        if (selectedDate === null) return;
        if (selectedDate.month === NOT_SELECTED_MONTH) return;

        props.onPick(selectedDate);
    }, [selectedDate?.month]);

    return (
        <View style={styles.pickerContainer}>
            <ScrollView style={styles.selectBox}>
                {Object.keys(props.paidDateRange).map((year, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.elementBox}
                        onPress={() => {
                            if (selectedDate === null) return;

                            setSelectedDate({
                                ...selectedDate,
                                year: parseInt(year),
                            });
                        }}>
                        <Text style={[styles.year, parseInt(year) === selectedDate?.year && styles.selectedYear]}>
                            {year}년
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <ScrollView style={styles.selectBox}>
                {selectedDate &&
                    props.paidDateRange[selectedDate.year].map((month, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.elementBox, styles.monthBox]}
                            onPress={() => {
                                if (selectedDate === null) return;
                                setSelectedDate({
                                    ...selectedDate,
                                    month: month,
                                });
                            }}>
                            <View style={styles.monthIconBox}>
                                <Icon name="calendar" size={styles.monthIcon.width} color={styles.monthIcon.color} />
                            </View>
                            <Text style={styles.month}>
                                {month >= 10 ? month.toString() : "0" + month.toString()}월
                            </Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
}

function useSelectModalStyles() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();
    const height = deviceUI.getScreenSize().height * 0.4;

    return StyleSheet.create({
        container: {
            height: height,
        },
        wrapper: {
            width: "100%",
            justifyContent: "center",
        },
        pickerContainer: {
            flexDirection: "row",
            justifyContent: "center",
        },
        selectBox: {
            height: height * 0.85 - safetyEdgeSize.bottom,
            width: "100%",
            marginTop: height * 0.05,
        },
        elementBox: {
            width: "100%",
            height: height * 0.12,
            justifyContent: "center",
            alignItems: "center",
        },
        monthBox: {
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
        },
        year: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(17),
            color: theme.color.specified.black,
        },
        selectedYear: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.blue,
        },
        month: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        monthIconBox: {
            marginRight: deviceUI.moderateScale(10),
        },
        monthIcon: {
            width: deviceUI.moderateScale(35),
            color: theme.color.specified.black,
        },
    });
}

type PickerProps = {
    initailSelectedDate: SelectedDate | null;
    paidDateRange: PaidDateRange;
    onPick(selectedData: SelectedDate): void;
};

type SelectModalProps = PickerProps & {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
