import { StyleSheet, View } from "react-native";
import CalendarDatePicker from "../../../../../common/blocks/calendar_picker";
import StardustModal from "../../../../../common/blocks/universial/stardust_modal";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { useState } from "react";
import EtdaTimePicker from "../../etad_time_picker";
import { EtdaTime } from "../../etad_time_picker/types";
import type { GuestVehicleDateSelectionModalProps } from "./types";
import type { Dates } from "../../../../../common/blocks/calendar_picker/types";
import StardustDateParser from "../../../../../../libs/date_parser";
import useGuestVehicleDateSelectionModalStyles from "./styles";

const PICK_DATE_PAGE = 1;
const PICK_TIME_PAGE = 2;

export default function GuestVehicleDateSelectionModal(props: GuestVehicleDateSelectionModalProps) {
    const styles = useGuestVehicleDateSelectionModalStyles();
    const [dates, setDates] = useState<Dates | null>(null);
    const [etda, setEtda] = useState<EtdaTime | null>(null);
    const [page, setPage] = useState<typeof PICK_DATE_PAGE | typeof PICK_TIME_PAGE>(PICK_DATE_PAGE);

    const handlePressOkayButton = () => {
        if (dates === null || etda === null) return;

        const startDate = StardustDateParser.changeTime(
            dates.startDate,
            {
                hours: etda.etd.hour as number,
                min: etda.etd.minute as number,
                sec: 0,
                ms: 0,
            },
            "kr"
        );
        const endDate = StardustDateParser.changeTime(
            dates.endDate,
            {
                hours: etda.eta.hour as number,
                min: etda.eta.minute as number,
                sec: 0,
                ms: 0,
            },
            "kr"
        );

        props.onChangeDate({
            startDate,
            endDate,
        });

        initialize();
    };

    const initialize = () => {
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
                    onPress: initialize,
                },
                {
                    text: page === PICK_DATE_PAGE ? "다음" : "확인",
                    onPress: () => {
                        if (page === PICK_DATE_PAGE) {
                            setPage(PICK_TIME_PAGE);
                        } else if (page === PICK_TIME_PAGE) {
                            handlePressOkayButton();
                        } else {
                            setPage(PICK_DATE_PAGE);
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
