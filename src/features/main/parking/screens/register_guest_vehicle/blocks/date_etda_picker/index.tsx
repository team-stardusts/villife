import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ContentBox from "../../../../../../common/blocks/content_box";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import Icon from "../../../../../../common/atoms/icon";
import { useState } from "react";
import GuestVehicleDateSelectionModal from "../../../../blocks/modal/date_selection";
import type { DateEtdaPickerProps } from "./types";

export default function DateRangePicker(props: DateEtdaPickerProps) {
    const messages = useScreenMessage();
    const styles = useDateEtdaPickerStyles();
    const [visible, setVisible] = useState<boolean>(false);

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
                            <DisplayDate styles={styles} direction="left" />
                        </View>
                        <View style={styles.dateIsolationContainer}>
                            <Icon name="arrow-right-with-midline" size={styles.icon.width} color={styles.icon.color} />
                        </View>
                        <View style={styles.dateAndTimeContainer}>
                            <DisplayDate styles={styles} direction="right" />
                        </View>
                    </View>
                </View>
            </ContentBox>
            <GuestVehicleDateSelectionModal
                visible={visible}
                setVisible={setVisible}
                onChangeDate={props.onChangeDateTimeRange}
            />
        </TouchableOpacity>
    );
}

type DisplayDateProps = {
    styles: ReturnType<typeof useDateEtdaPickerStyles>;
    direction: "left" | "right";
};

function DisplayDate({ styles, direction }: DisplayDateProps) {
    return (
        <View style={styles.dateContainer}>
            <View
                style={[
                    styles.dateBox,
                    {
                        alignItems: direction === "left" ? "flex-start" : "flex-end",
                    },
                ]}>
                <Text style={styles.date}>23/08/11</Text>
            </View>
            <View
                style={[
                    styles.timeBox,
                    {
                        justifyContent: direction === "left" ? "flex-start" : "flex-end",
                    },
                ]}>
                <Text style={styles.time}>00 : 00</Text>
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
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: 20,
        },
        time: {
            fontSize: 18,
            fontFamily: theme.font.fontFamily.pretendard.medium,
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
