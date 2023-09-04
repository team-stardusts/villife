import { View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import type { DateChangedCallback } from "react-native-calendar-picker";
import Icon from "../../atoms/icon";
import useStyler from "../../hooks/styler/hooks";
import { useEffect, useState } from "react";
import type { CalendarDatePickerProps, Dates, PickedDates } from "./types";

export default function CalendarDatePicker(props: CalendarDatePickerProps) {
    const { deviceUI, theme } = useStyler();
    const minDate = new Date(); // today
    const [dates, setDates] = useState<PickedDates>({
        startDate: props.initialDate ?? new Date(),
        endDate: null,
    });

    useEffect(() => {
        if (dates.endDate === null) return;
        props.onDateChange && props.onDateChange(dates as Dates);
    }, [dates]);

    const getPreviousNextComponent = (type: "previous" | "next"): React.ReactNode => {
        const iconName = type === "previous" ? "arrow-left" : "arrow-right";
        return (
            <View style={{ marginHorizontal: deviceUI.moderateScale(10) }}>
                <Icon name={iconName} size={deviceUI.moderateScale(40)} color={theme.color.specified.lightblue} />
            </View>
        );
    };

    const onDateChange: DateChangedCallback = (date, type): void => {
        if (date === null) return;

        if (type === "START_DATE") {
            setDates({
                ...dates,
                startDate: date.toDate(),
            });

            return;
        }

        setDates({
            ...dates,
            endDate: date.toDate(),
        });
    };

    return (
        <View>
            <CalendarPicker
                onDateChange={(date, type) => onDateChange(date, type)}
                previousComponent={getPreviousNextComponent("previous")}
                nextComponent={getPreviousNextComponent("next")}
                textStyle={{
                    fontFamily: theme.font.fontFamily.pretendard.regular,
                }}
                customDayHeaderStyles={() => {
                    return {
                        style: {},
                        textStyle: {
                            color: theme.color.series.grey.level4,
                        },
                    };
                }}
                minDate={minDate}
                selectedStartDate={dates.startDate}
                selectedDayColor={theme.color.specified.lightblue as string}
                selectedDayTextColor={theme.color.specified.white as string}
                width={props.width}
                showDayStragglers={false}
                allowRangeSelection
                //scrollable
            />
        </View>
    );
}
