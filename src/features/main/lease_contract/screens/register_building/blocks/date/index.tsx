import { Text, TouchableOpacity, View } from "react-native";
import { MFDaySetterProps, MFDaysSetterProps } from "./types";
import Icon from "../../../../../../common/atoms/icon";
import HorizontalNumberPickingModal from "../../../../../../common/blocks/modal/horizontal_number";
import { useEffect, useState } from "react";

type SelectedMFDay = {
    notiDay: {
        name: "고지일";
        explanation: string;
        day: number | null;
    };
    dueDay: {
        name: "마감일";
        explanation: string;
        day: number | null;
    };
};

export default function MFDaysSetter(props: MFDaysSetterProps) {
    const [mfdays, setMFDays] = useState<SelectedMFDay>({
        notiDay: {
            name: "고지일",
            explanation: "관리비를 고지할 날을 지정해주세요.",
            day: null,
        },
        dueDay: {
            name: "마감일",
            explanation: "관리비 납부 마감일을 지정해주세요.",
            day: null,
        },
    });

    useEffect(() => {
        if (mfdays.dueDay.day === null && mfdays.notiDay.day === null) return;

        props.onChangeMFDay({
            dueDay: mfdays.dueDay.day,
            notiDay: mfdays.notiDay.day,
        });
    }, [mfdays]);

    return (
        <View style={props.styles.container}>
            <View style={props.styles.titleBox}>
                <Text style={props.styles.title}>관리비 정보 설정</Text>
            </View>
            <View style={props.styles.wrapper}>
                {Object.keys(mfdays).map((k, i) => {
                    const mfday = k === "notiDay" ? mfdays.notiDay : mfdays.dueDay;

                    return (
                        <MFDaySetter
                            key={i}
                            initialDay={mfday.day}
                            dayName={mfday.name}
                            styles={props.styles}
                            explanation={mfday.explanation}
                            onChangeMFDay={(num) => {
                                setMFDays({
                                    ...mfdays,
                                    [k]: {
                                        ...mfday,
                                        day: num,
                                    },
                                });
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
}

function MFDaySetter(props: MFDaySetterProps) {
    const dayRange = Array.from({ length: 28 }, (_, k) => k + 1);
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
            <View style={props.styles.row}>
                <View style={props.styles.rowTitleWrapper}>
                    <Text style={props.styles.rowTitle}>{props.dayName}</Text>
                </View>
                <View style={props.styles.rowContentBox}>
                    {/* <View style={props.styles.rowContentExplanation}>
                        <Text>{props.explanation}</Text>
                    </View> */}
                    <View style={props.styles.setterWrapper}>
                        <TouchableOpacity
                            style={props.styles.setterBtn}
                            activeOpacity={0.6}
                            onPress={() => setVisible(true)}>
                            <View style={props.styles.setterDisplayBox}>
                                <Text style={props.styles.setterText}>{selectedDay ? `${selectedDay}일` : "선택"}</Text>
                            </View>
                            <View style={props.styles.setterIconWrapper}>
                                <Icon
                                    name="arrow-down"
                                    size={props.styles.setterIcon.width}
                                    color={props.styles.setterIcon.color}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}
