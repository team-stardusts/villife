import { Animated, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useHomeContentFromManagementFeeStyles from "./styles";
import usePayer from "../../services/payer_legacy";
import { useEffect, useState } from "react";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import SpinningWon from "../icon/spinning_won";
import { insertCommaToNumber } from "../../../../common/global_function";
import { PaymentBill, UserPaymentManagerBase } from "../../services/payment/types";
import useManagementFeeManager from "../../services/payment";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import VillifeToastMessage from "../../../../common/atoms/toast";
import { StardustAlertContent } from "../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";

export default function HomeContentFromManagementFee() {
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useHomeContentFromManagementFeeStyles();
    const user = useUserInformation();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: "이미 관리비를 납부하셨나요?",
        message: "관리자가 고객님의 납부 내역을 확인할 수 있도록 알림을 보낼게요!",
        visible: false,
    });
    const [bill, setBill] = useState<PaymentBill | null>(null);

    useEffect(() => {
        manager.updateHistory();
    }, []);

    useEffect(() => {
        setBill(manager.calcByPaymentItem(manager.history));
    }, [manager.history]);

    const handlePressPaymentBtn = () => {
        if (bill) {
            /* navigation.navigate("confirm_payment_cost", {
                title: "관리비 결제하기",
                product_id: thisMonthMF.bill_id,
                product_name: "?",
                product_type: "pt_management_fee",
                price: thisMonthMF.amount_won,
                bill: {
                    관리용역비: 20000,
                    일반관리비: 45000,
                    소독비: 100,
                    화재보험료: 100,
                    수선유지비: 100,
                },
            }); */
            /* navigation.navigate("management_fee_current_month_detail", {
                unpaidFee: unpaidFee,
            }); */
            navigation.navigate("management_fee_current_month_detail", {
                ...bill,
            });
            //navigation.navigate("wire_amount_manually");
        }
    };

    const hideAlert = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    const requestApproval = async () => {
        if (bill === null || bill.feeToPay === 0) return;

        const result = await manager.requestPaymentConfirmation({
            amountWon: bill.feeToPay,
            billIDs: manager.history.filter((h) => !h.is_paid).map((h) => h.bill_id),
            sender: manager.user?.roomNumber.toString(),
        });

        VillifeToastMessage.showBottomToast(
            result ? "success" : "error",
            result ? "확인 요청을 전송했어요." : "요청이 전송되지 않았어요. 잠시후 다시 시도해주세요."
        );

        hideAlert();
    };

    return (
        <MiniContent
            title={"관리비"}
            navigation={{
                to: "management_fee",
            }}
            titleColor={styles.contentsBox.color}
            backgroundColor={styles.contentsBox.backgroundColor}
            eanbleShadow={false}>
            <StardustAlert {...alert} setAlert={setAlert} />
            <View style={styles.container}>
                <View style={styles.header}>
                    {<Text style={styles.headerText}>{user?.roomNumber}호 납부 필요 관리비</Text>}
                </View>
                <View style={styles.body}>
                    <View style={styles.managementFeeBox}>
                        <SpinningWon size={20} />
                        {<Text style={styles.managementFee}>{insertCommaToNumber(bill?.feeToPay ?? 0)}원</Text>}
                    </View>
                    {bill?.feeToPay !== 0 && (
                        <TouchableOpacity style={styles.paymentBtn} activeOpacity={0.6} onPress={handlePressPaymentBtn}>
                            <Text style={styles.paymentText}>{/* 결제하기 */}이체하기</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.bottom}>
                    {bill !== null && bill.unpaidFee > 0 && (
                        <>
                            <Text style={styles.bottomText}>이미 납부 하셨나요?</Text>
                            <TouchableOpacity
                                style={styles.confirmationShortCutBtn}
                                onPress={() =>
                                    setAlert({
                                        ...alert,
                                        visible: true,
                                        buttons: [
                                            {
                                                text: "취소",
                                                onPress: () => hideAlert(),
                                            },
                                            {
                                                text: "보내기",
                                                onPress: () => requestApproval(),
                                            },
                                        ],
                                    })
                                }>
                                <Text style={styles.confirmationShortCutBtnText}>납부확인요청</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </MiniContent>
    );
}
