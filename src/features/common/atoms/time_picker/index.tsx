import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ContentBox from "../../blocks/content_box";
import { TimePickerProps, TimePickerTime } from "./types";
import NumberPicker from "./number_picker";
import useStyler from "../../hooks/styler/hooks";

export default function TimePicker({
    height,
    initialTime,
    focusedcolor,
    unFocusedColor,
    onTimeChange,
}: TimePickerProps) {
    const hours = Array.from({ length: 24 }, (v, k) => k);
    const minutes = Array.from({ length: 12 }, (v, k) => k * 5);

    const { deviceUI, theme } = useStyler();
    // [TO-DO] Initial Time이 유효하지 않을 시 Throw Error
    const [time, setTime] = useState<TimePickerTime>(
        initialTime ?? {
            hour: hours[0],
            minute: minutes[0],
        }
    );

    useEffect(() => {
        onTimeChange && onTimeChange(time);
    }, [time]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        timeIsolationText: {
            color: focusedcolor || theme.colorFamily.black,
            paddingBottom: deviceUI.moderateScale(10),
            ...theme.font.researved.h2,
        },
    });

    return (
        <View style={styles.container}>
            <NumberPicker
                initialIndex={initialTime && initialTime.hour !== null ? hours.indexOf(initialTime.hour) : 0}
                height={height}
                numbers={hours}
                focusedcolor={focusedcolor}
                unFocusedColor={unFocusedColor}
                onNumberChange={(number) =>
                    setTime({
                        ...time,
                        hour: number,
                    })
                }
            />
            <Text style={styles.timeIsolationText}>:</Text>
            <NumberPicker
                initialIndex={initialTime && initialTime.minute !== null ? minutes.indexOf(initialTime.minute) : 0}
                height={height}
                numbers={minutes}
                focusedcolor={focusedcolor}
                unFocusedColor={unFocusedColor}
                onNumberChange={(number) =>
                    setTime({
                        ...time,
                        minute: number,
                    })
                }
            />
        </View>
    );
}
