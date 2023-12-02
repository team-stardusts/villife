import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../../common/router/types";
import ContentBox from "../../../../../../../common/blocks/content_box";
import SpinningWon from "../../../../../blocks/icon/spinning_won";
import { ManagementFeeBoxProps } from "../types";
import useUserInformation from "../../../../../../../common/hooks/service/user_info";
import { useEffect, useState } from "react";
import useManagementFeeManager from "../../../../../services/payment";
import { UserPaymentManagerBase } from "../../../../../services/payment/types";
import VillifeToastMessage from "../../../../../../../common/atoms/toast";
import { StardustAlertContent } from "../../../../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../../../../common/blocks/universial/stardust_alert";

export default function ManagementFeeBox(props: ManagementFeeBoxProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const user = useUserInformation();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const [alert, setAlert] = useState<StardustAlertContent>({
        type: "primary",
        title: "이미 관리비를 납부하셨나요?",
        message: "관리자가 고객님의 납부 내역을 확인할 수 있도록 알림을 보낼게요!",
        visible: false,
    });
    /* const [dueDate, setDueDate] = useState<Date | null>(null);

    useEffect(() => {
        if (props.manangementFee === undefined) return;

        console.log(new Date(props.manangementFee.year, props.manangementFee.month));
    }, []); */

    const insertCommaToMoney = (money: number): string => {
        if (money == undefined) return "0";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handlePressPaymentBtn = () => {
        if (props.feeToPay !== undefined) {
            /* navigation.navigate("confirm_payment_cost", {
                title: "관리비 결제하기",
                product_id: props.manangementFee.bill_id,
                product_name: "?",
                product_type: "pt_management_fee",
                price: props.manangementFee.amount_won,
                bill: {
                    관리용역비: 20000,
                    일반관리비: 45000,
                    소독비: 100,
                    화재보험료: 100,
                    수선유지비: 100,
                },
            }); */
            navigation.navigate("wire_amount_manually", {
                amount_won: props.feeToPay,
            });
            /* navigation.navigate("management_fee_current_month_detail", {
                unpaidFee: props.unpaidFee,
            }); */
        }
    };

    const hideAlert = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    };

    const requestApproval = async () => {
        if (props.feeToPay === undefined || props.feeToPay === 0) return;

        const result = await manager.requestPaymentConfirmation({
            amountWon: props.feeToPay,
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
        <View style={props.styles.container}>
            <StardustAlert {...alert} setAlert={setAlert} />
            <ContentBox backgroundColor={props.styles.contentBox.color} enableShadow={false}>
                <View style={props.styles.contentWrapper}>
                    <View style={props.styles.header}>
                        <Text style={props.styles.headerText}>{user?.roomNumber}호 관리비</Text>
                    </View>
                    <View style={props.styles.body}>
                        <View style={props.styles.managementFeeBox}>
                            <SpinningWon size={20} />
                            {
                                <Text style={props.styles.managementFee}>
                                    {props.feeToPay ? insertCommaToMoney(props.feeToPay) : "0"}원
                                </Text>
                            }
                        </View>
                        {props.feeToPay !== 0 && (
                            <TouchableOpacity
                                style={[props.styles.paymentBtn]}
                                activeOpacity={0.6}
                                onPress={handlePressPaymentBtn}
                                disabled={props.feeToPay === 0}>
                                <Text style={[props.styles.paymentText]}>{/* 결제하기 */}이체하기</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={props.styles.confirmationShortCutBox}>
                        {props.feeToPay !== undefined && props.feeToPay > 0 && (
                            <>
                                <Text style={props.styles.confirmationShortCutQuestionText}>이미 납부 하셨나요?</Text>
                                <TouchableOpacity
                                    style={props.styles.confirmationShortCutBtn}
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
                                    <Text style={props.styles.confirmationShortCutBtnText}>납부확인요청</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
