import { Text, TouchableOpacity, View } from "react-native";
import DatePickModal from "./date_pick_modal";
import { useEffect, useState } from "react";
import type { ContractRange } from "../types";
import type { Dates } from "../../../../../common/blocks/calendar_picker/types";

export default function ContractDateRange(props: ContractRange) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [dates, setDates] = useState<Dates | null>(null);

    useEffect(() => {
        if (dates === null) return;
        props.onChangeInfo(dates);
    }, [dates]);

    const convertDateToString = (date: Date | undefined) => {
        if (date === undefined) return "";

        const convertOneDigitToTwoDigits = (number: number): string => {
            const numString = number.toString();

            if (number < 10) {
                return "0" + numString;
            }

            return numString;
        };
        return `${date.getFullYear().toString()}-${convertOneDigitToTwoDigits(
            date.getMonth() + 1
        )}-${convertOneDigitToTwoDigits(date.getDate())}`;
    };

    return (
        <View style={props.styles.col}>
            <DatePickModal modalVisible={modalVisible} setModalVisible={setModalVisible} onChangeDates={setDates} />
            <View style={props.styles.colTitleBox}>
                <Text style={props.styles.title}>계약 날짜</Text>
            </View>
            <View style={props.styles.contractDateRangeBox}>
                <TouchableOpacity
                    style={props.styles.contractDateRangeInput}
                    activeOpacity={0.6}
                    onPress={() => setModalVisible(true)}>
                    <Text style={props.styles.contractDateRangeInputText}>
                        {dates ? convertDateToString(dates.startDate) : "입주일"}
                    </Text>
                </TouchableOpacity>
                <Text style={props.styles.contractDateRangeSeparator}>-</Text>
                <TouchableOpacity
                    style={props.styles.contractDateRangeInput}
                    activeOpacity={0.6}
                    onPress={() => setModalVisible(true)}>
                    <Text style={props.styles.contractDateRangeInputText}>
                        {dates ? convertDateToString(dates.endDate) : "만기일"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
