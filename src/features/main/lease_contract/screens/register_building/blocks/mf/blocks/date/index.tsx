import { useEffect, useState } from "react";
import HorizontalNumberPickingModal from "../../../../../../../../common/blocks/modal/horizontal_number";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "../../../../../../../../common/atoms/icon";
import { MFDaySetterProps } from "./types";

export default function MFDaySetter(props: MFDaySetterProps) {
    const dayRange = Array.from({ length: 31 }, (_, k) => k + 1);
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    useEffect(() => {
        if (selectedDay === null) return;

        props.onChangeMFDay(selectedDay);
    }, [selectedDay]);

    return (
        <>
            <HorizontalNumberPickingModal
                //initialIndex={selectedDay ? dayRange.indexOf(selectedDay) : undefined}
                numbersRange={dayRange}
                modalVisible={visible}
                setModalVisible={setVisible}
                onChangeNumber={setSelectedDay}
            />
            <View style={props.styles.main.row}>
                <View style={props.styles.main.rowTitleWrapper}>
                    <Text style={props.styles.main.rowTitle}>{props.dayName}</Text>
                </View>
                <View style={props.styles.main.rowContentBox}>
                    <View style={props.styles.main.rowContentExplanation}>
                        <Text style={props.styles.main.rowContentExplanationText}>{props.explanation}</Text>
                    </View>
                    <View style={props.styles.date.setterWrapper}>
                        <TouchableOpacity
                            style={props.styles.date.setterBtn}
                            activeOpacity={0.6}
                            onPress={() => setVisible(true)}>
                            <View style={props.styles.date.setterDisplayBox}>
                                <Text style={props.styles.date.setterText}>
                                    {selectedDay ? `${selectedDay}일` : "선택"}
                                </Text>
                            </View>
                            <View style={props.styles.date.setterIconWrapper}>
                                <Icon
                                    name="arrow-down"
                                    size={props.styles.date.setterIcon.width}
                                    color={props.styles.date.setterIcon.color}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}
