import { StyleSheet, Text, View } from "react-native";
import TimePicker from "../../../../common/atoms/time_picker";
import ContentBox from "../../../../common/blocks/content_box";
import useStyler from "../../../../common/hooks/styler/hooks";
import { useEffect, useState } from "react";
import { TimePickerTime } from "../../../../common/atoms/time_picker/types";
import Icon from "../../../../common/atoms/icon";
import { EtdaTime, EtdaTimePickerProps } from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function EtdaTimePicker({ initialTime, enableShadow, onTimeChange }: EtdaTimePickerProps) {
    const { deviceUI, theme } = useStyler();
    const messages = useScreenMessage();
    const height: number = deviceUI.moderateScale(150);
    const timepickerHeight: number = height * 0.75;
    const headerHeight: number = height * 0.25;

    const [etda, setEtda] = useState<EtdaTime>(
        initialTime ?? {
            etd: {
                hour: 0,
                minute: 0,
            },
            eta: {
                hour: 0,
                minute: 0,
            },
        }
    );

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: height,
        },
        contentsContainer: {
            width: "100%",
            height: "100%",
            paddingHorizontal: deviceUI.moderateScale(15),
        },
        headersContainer: {
            width: "100%",
            height: headerHeight,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(5),
            //borderColor: theme.color.series.grey.level1,\
            borderColor: theme.color.specified.black,
            borderBottomWidth: deviceUI.moderateScale(2),
        },
        headerContainer: {
            //marginHorizontal: deviceUI.moderateScale(5),
            flexDirection: "row",
            alignItems: "center",
        },
        headerIconWrapper: {
            //width: deviceUI.moderateScale(15),
            height: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(15),
            paddingHorizontal: deviceUI.moderateScale(5),
            justifyContent: "center",
            alignItems: "center",
        },
        headerIcon: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(10),
            color: theme.color.specified.white,
        },
        header: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
        },
        etdaSettingContainer: {
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        timePickerContainer: {
            width: "30%",
        },
        timeIsolationContainer: {
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
    });

    useEffect(() => {
        if (etda === initialTime) return;
        onTimeChange && onTimeChange(etda);
    }, [etda]);

    return (
        <View style={styles.container}>
            <ContentBox backgroundColor={theme.color.specified.white} enableShadow={enableShadow}>
                <View style={styles.contentsContainer}>
                    <View style={styles.headersContainer}>
                        <View style={styles.headerContainer}>
                            <View
                                style={[
                                    styles.headerIconWrapper,
                                    {
                                        marginRight: deviceUI.moderateScale(5),
                                        backgroundColor: theme.color.status.success,
                                    },
                                ]}>
                                <Text style={styles.headerIcon}>In</Text>
                            </View>
                            <Text style={styles.header}>{messages.messages.words.vehicle_arrival_time}</Text>
                        </View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>{messages.messages.words.vehicle_departure_time}</Text>
                            <View
                                style={[
                                    styles.headerIconWrapper,
                                    {
                                        marginLeft: deviceUI.moderateScale(5),
                                        backgroundColor: theme.color.status.success,
                                    },
                                ]}>
                                <Text style={styles.headerIcon}>Out</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.etdaSettingContainer}>
                        <View style={styles.timePickerContainer}>
                            <TimePicker
                                initialTime={initialTime?.eta}
                                height={timepickerHeight}
                                focusedcolor={theme.color.specified.darkgrey}
                                unFocusedColor={theme.color.specified.lightgrey}
                                onTimeChange={(eta: TimePickerTime) => setEtda({ ...etda, eta })}
                            />
                        </View>
                        <View style={styles.timeIsolationContainer}>
                            <Icon name="arrow-right-with-midline" size={styles.icon.width} color={styles.icon.color} />
                        </View>
                        <View style={styles.timePickerContainer}>
                            <TimePicker
                                initialTime={initialTime?.etd}
                                height={timepickerHeight}
                                focusedcolor={theme.color.specified.darkgrey}
                                unFocusedColor={theme.color.specified.lightgrey}
                                onTimeChange={(etd: TimePickerTime) => setEtda({ ...etda, etd })}
                            />
                        </View>
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
