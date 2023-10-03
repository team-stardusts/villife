import { View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import type { DateChangedCallback } from "react-native-calendar-picker";
import Icon from "../../atoms/icon";
import useStyler from "../../hooks/styler/hooks";
import { useEffect, useState } from "react";
import type { CalendarDatePickerProps, Dates, PickedDates } from "./types";

export default function CalendarDatePicker(props: CalendarDatePickerProps) {
    const { deviceUI, theme } = useStyler();
    const [dates, setDates] = useState<PickedDates>({
        startDate: null,
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
                allowRangeSelection
                customDayHeaderStyles={() => {
                    return {
                        style: {},
                        textStyle: {
                            color: theme.color.series.grey.level4,
                        },
                    };
                }}
                initialDate={props.initialDate}
                minDate={props.minDate}
                nextComponent={getPreviousNextComponent("next")}
                onDateChange={(date, type) => onDateChange(date, type)}
                previousComponent={getPreviousNextComponent("previous")}
                selectedStartDate={props.selectedStartData}
                selectedEndDate={props.selectedEndData}
                selectedDayColor={theme.color.specified.lightblue as string}
                selectedDayTextColor={theme.color.specified.white as string}
                todayBackgroundColor={theme.color.specified.green as string}
                showDayStragglers={false}
                textStyle={{
                    fontFamily: theme.font.fontFamily.pretendard.regular,
                }}
                width={props.width}
                weekdays={["일", "월", "화", "수", "목", "금", "토"]}
                months={["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]}
                selectMonthTitle={"월 선택\t"}
                selectYearTitle="연도 선택"
                //scrollable
            />
        </View>
    );
}
