import { useState } from "react";
import CalendarDatePicker from "../../../../../common/blocks/modal/calendar";
import StardustModal from "../../../../../common/blocks/universial/stardust_modal";
import useStyler from "../../../../../common/hooks/styler/hooks";
import { Dates } from "../../../../../common/blocks/modal/calendar/types";
import VillifeToastMessage from "../../../../../common/atoms/toast";

export default function DatePickModal(props: DatePickModalProps) {
    const [dates, setDates] = useState<Dates | null>(null);
    const { deviceUI } = useStyler();

    const handlePressOkey = () => {
        if (dates === null) {
            VillifeToastMessage.showBottomToast("error", "기간을 선택해주세요.");
            return;
        }
        props.onChangeDates(dates);
        props.setModalVisible(false);
        setDates(null);
    };

    return (
        <StardustModal
            modalVisible={props.modalVisible}
            setModalVisible={props.setModalVisible}
            title={"날짜 선택"}
            //subtitle={props.subtitle}
            buttons={[
                {
                    text: "취소",
                    onPress: () => props.setModalVisible(false),
                },
                {
                    text: "확인",
                    onPress: () => handlePressOkey(),
                },
            ]}>
            <CalendarDatePicker width={deviceUI.getScreenSize().width * 0.8} onDateChange={setDates} />
        </StardustModal>
    );
}

export type DatePickModalProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onChangeDates(dates: Dates): void;
};
