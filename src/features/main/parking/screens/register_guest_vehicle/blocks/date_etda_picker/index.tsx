import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ContentBox from "../../../../../../common/blocks/content_box";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import Icon from "../../../../../../common/atoms/icon";
import { useEffect, useState } from "react";
import GuestVehicleDateSelectionModal from "../../../../blocks/modal/date_selection";
import type { DateEtdaPickerProps } from "./types";
import { DateRange } from "../../../../blocks/modal/date_selection/types";
import StardustDateParser from "../../../../../../../libs/date_parser";

export default function DateRangePicker(props: DateEtdaPickerProps) {
    //const messages = useScreenMessage();
    const styles = useDateEtdaPickerStyles();
    const [visible, setVisible] = useState<boolean>(false);
    const [dates, setDates] = useState<DateRange | null>(null);

    useEffect(() => {
        if (dates === null) {
            const initialStartDate = StardustDateParser.changeGMT(new Date(), "kr");
            const initialEndDate = new Date(initialStartDate);
            initialEndDate.setHours(initialEndDate.getHours() + 1);

            setDates({
                startDate: initialStartDate,
                endDate: initialEndDate,
            });
            return;
        }

        props.onChangeDateTimeRange(dates);
    }, [dates]);

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={() => setVisible(true)}>
            <ContentBox backgroundColor={styles.container.backgroundColor} enableShadow>
                <View style={styles.contentsContainer}>
                    <View style={styles.headersContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>방문</Text>
                        </View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>출차</Text>
                        </View>
                    </View>
                    <View style={styles.dateDisplayContainer}>
                        <View style={styles.dateAndTimeContainer}>
                            <DisplayDate styles={styles} direction="left" date={dates?.startDate} />
                        </View>
                        <View style={styles.dateIsolationContainer}>
                            <Icon name="arrow-right-with-midline" size={styles.icon.width} color={styles.icon.color} />
                        </View>
                        <View style={styles.dateAndTimeContainer}>
                            <DisplayDate styles={styles} direction="right" date={dates?.endDate} />
                        </View>
                    </View>
                </View>
            </ContentBox>
            <GuestVehicleDateSelectionModal
                selectedStartDate={dates?.startDate}
                selectedEndDate={dates?.endDate}
                visible={visible}
                setVisible={setVisible}
                onChangeDate={setDates}
            />
        </TouchableOpacity>
    );
}

type DisplayDateProps = {
    styles: ReturnType<typeof useDateEtdaPickerStyles>;
    direction: "left" | "right";
    date: Date | undefined;
};

function DisplayDate({ styles, direction, date }: DisplayDateProps) {
    const initialDateString = "00/00/00";
    const initialTimeString = "00 : 00";

    const getDateString = () => {
        if (!date) return;

        const years = keepDoubleDigits(date.getUTCFullYear()).substring(2);
        const months = keepDoubleDigits(date.getUTCMonth() + 1);
        const days = keepDoubleDigits(date.getUTCDate());

        return `${years}/${months}/${days}`;
    };

    const getTimeString = () => {
        if (!date) return;

        const hours = keepDoubleDigits(date.getUTCHours());
        const mins = keepDoubleDigits(date.getUTCMinutes());

        return `${hours} : ${mins}`;
    };

    const keepDoubleDigits = (num: number): string => {
        if (num >= 10) {
            return num.toString();
        }

        return "0" + num.toString();
    };

    return (
        <View style={styles.dateContainer}>
            <View
                style={[
                    styles.dateBox,
                    {
                        alignItems: direction === "left" ? "flex-start" : "flex-end",
                    },
                ]}>
                <Text style={styles.date}>{date ? getDateString() : initialDateString}</Text>
            </View>
            <View
                style={[
                    styles.timeBox,
                    {
                        justifyContent: direction === "left" ? "flex-start" : "flex-end",
                    },
                ]}>
                <Text style={styles.time}>{date ? getTimeString() : initialTimeString}</Text>
            </View>
        </View>
    );
}

function useDateEtdaPickerStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            height: deviceUI.moderateScale(150),
            backgroundColor: theme.color.specified.white,
        },
        contentsContainer: {
            width: "100%",
            height: "100%",
            paddingHorizontal: deviceUI.moderateScale(15),
        },
        headersContainer: {
            width: "100%",
            height: "25%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(5),
            borderColor: theme.color.specified.black,
            borderBottomWidth: deviceUI.moderateScale(2),
        },
        headerContainer: {
            marginHorizontal: deviceUI.moderateScale(5),
        },
        header: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
        },
        dateDisplayContainer: {
            height: "75%",
            flexDirection: "row",
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        dateAndTimeContainer: {
            width: "40%",
        },
        dateContainer: {
            height: "100%",
            width: "100%",
        },
        dateBox: {
            flex: 0.5,
            justifyContent: "flex-end",
            alignItems: "flex-start",
            marginBottom: 5,
        },
        timeBox: {
            flex: 0.5,
            justifyContent: "flex-start",
            flexDirection: "row",
        },
        date: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(20),
            color: theme.color.specified.black,
        },
        time: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(18),
            color: theme.color.specified.black,
        },
        dateIsolationContainer: {
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
    });
}
