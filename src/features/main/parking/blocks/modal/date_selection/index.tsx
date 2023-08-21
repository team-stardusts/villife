import { StyleSheet, View } from "react-native";
import CalendarDatePicker from "../../../../../common/blocks/calendar_picker";
import StardustModal from "../../../../../common/blocks/universial/stardust_modal";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { useCallback, useState } from "react";
import EtdaTimePicker from "../../etad_time_picker";
import { EtdaTime } from "../../etad_time_picker/types";
import type { GuestVehicleDateSelectionModalProps } from "./types";
import type { Dates } from "../../../../../common/blocks/calendar_picker/types";
import StardustDateParser from "../../../../../../libs/date_parser";

export default function GuestVehicleDateSelectionModal(props: GuestVehicleDateSelectionModalProps) {
    const styles = useGuestVehicleDateSelectionModalStyles();
    const [dates, setDates] = useState<Dates | null>(null);
    const [etda, setEtda] = useState<EtdaTime | null>(null);
    const [page, setPage] = useState<1 | 2>(1);

    const handlePressOkayButton = () => {
        console.log(page);
        if (dates === null || etda === null) return;
        const startDate = dates.startDate;
        console.log("PRE", StardustDateParser.deserialize(startDate.getTime() / 1000));
        console.log(StardustDateParser.deserialize(new Date(startDate.setHours(1)).getTime() / 1000));
        startDate.setHours(1, etda.etd.minute as number);
        console.log("REC", startDate);
        props.onChangeDate({
            startDate: {
                date: dates.startDate,
                time: etda.etd,
            },
            endDate: {
                date: dates.endDate,
                time: etda.eta,
            },
        });
        setPage(1);
        setDates(null);
        setEtda(null);
        props.setVisible(false);
    };

    return (
        <StardustModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            title="테스트 모달"
            subtitle="방문일과 출차일을 선택해주세요."
            buttons={[
                {
                    text: "취소",
                    onPress: () => props.setVisible(false),
                },
                {
                    text: page === 1 ? "다음" : "확인",
                    onPress: () => {
                        if (page === 1) {
                            setPage(2);
                        } else if (page === 2) {
                            handlePressOkayButton();
                        } else {
                            setPage(1);
                        }
                    },
                    disabled: dates === null,
                },
            ]}>
            <View style={styles.container}>
                {page === 1 ? (
                    <CalendarDatePicker width={styles.datePicker.width} onDateChange={setDates} />
                ) : (
                    <View style={styles.etdaPicker}>
                        <EtdaTimePicker onTimeChange={setEtda} />
                    </View>
                )}
            </View>
        </StardustModal>
    );
}

function useGuestVehicleDateSelectionModalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            paddingVertical: deviceUI.moderateScale(10),
            justifyContent: "center",
            alignItems: "center",
        },
        datePicker: {
            width: deviceUI.getScreenSize().width * 0.9,
        },
        etdaPicker: {
            width: deviceUI.getScreenSize().width * 0.85,
            //height: deviceUI.moderateScale(135),
        },
    });
}
