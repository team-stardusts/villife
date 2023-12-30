import { Text, View } from "react-native";
import StardustModal from "../../../../../../../../../common/blocks/universial/stardust_modal";
import { PaymentInfoInputModalProps } from "./types";
import usePaymentInfoInputModalStyles from "./styles";
import UniversalTextInput from "../../../../../../../../../common/blocks/universial/textinput";
import CalendarDatePicker from "../../../../../../../../../common/blocks/modal/calendar";
import { useMemo, useState } from "react";
import StringValidator from "../../../../../../../../../../libs/string_validator";
import VillifeToastMessage from "../../../../../../../../../common/atoms/toast";
import useRenterMFViewModel from "../../../../../../../viewmodel/renter";

export default function PaymentInfoInputModal(props: PaymentInfoInputModalProps) {
    const styles = usePaymentInfoInputModalStyles();
    const viewModel = useRenterMFViewModel();
    const validator = new StringValidator();
    const [depositor, setDepositor] = useState<string | null>(null);
    const [depositDate, setDepositDate] = useState<Date | null>(null);
    const isDone = useMemo(() => {
        if (!depositor || !depositDate) return false;
        return true;
    }, [depositor, depositDate]);

    const requestApproval = async () => {
        if (viewModel.user.roomNumber === undefined) {
            VillifeToastMessage.showBottomToast("error", "사용자의 호수가 확인되지 않습니다.");
            return;
        }

        const result = await viewModel.requestPaymentConfirmation({
            amountWon: props.bill.feeToPay,
            billIds: viewModel.data.filter((h) => !h.isPaid).map((h) => h.billId),
            depositorName: depositor as string,
        });

        VillifeToastMessage.showBottomToast(
            result ? "success" : "error",
            result ? "확인 요청을 전송했어요." : "요청이 전송되지 않았어요. 잠시후 다시 시도해주세요."
        );

        setDepositor(null);
        setDepositDate(null);
        props.setVisible(false);
    };

    return (
        <StardustModal
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            title="관리비 납부 정보 기입"
            subtitle={[
                "원활한 관리비 수납을 위해 납부 정보가 필요합니다.",
                "납부 날짜와 함께 사용했던 예금주명을 입력해주세요.",
            ]}
            buttons={[
                {
                    text: "취소",
                    onPress: () => props.setVisible(false),
                },
                {
                    text: "확인",
                    disabled: !isDone,
                    onPress: () => requestApproval(),
                },
            ]}>
            <View style={styles.container}>
                <Text style={styles.subject}>받는 분에게 표시(예금주명)</Text>
                <View style={styles.inputBox}>
                    <UniversalTextInput
                        placeholder="특수문자를 제외하고 7자 이내로 작성해주세요."
                        value={depositor ?? ""}
                        onChangeText={(text) => {
                            if (validator.hasSpecialChar(text)) {
                                VillifeToastMessage.showBottomToast("error", "특수문자는 사용하실 수 없어요!");
                                return;
                            }
                            if (text.length > 7) {
                                VillifeToastMessage.showBottomToast("error", "예금주명은 7자리를 넘길 수 없어요!");
                                return;
                            }
                            setDepositor(text === "" ? null : text);
                        }}
                    />
                </View>
                <Text style={styles.subject}>납부 날짜</Text>
                <View style={styles.calendarBox}>
                    <CalendarDatePicker
                        allowRangeSelection={false}
                        width={styles.calendar.width}
                        onDateChange={setDepositDate}
                        maxDate={new Date()}
                    />
                </View>
            </View>
        </StardustModal>
    );
}
