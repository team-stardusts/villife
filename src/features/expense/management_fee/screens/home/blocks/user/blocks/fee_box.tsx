import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../../common/router/types";
import ContentBox from "../../../../../../../common/blocks/content_box";
import SpinningWon from "../../../../../blocks/icon/spinning_won";
import { ManagementFeeBoxProps } from "../types";
import useUserInformation from "../../../../../../../common/hooks/service/user_info";
import { useEffect, useState } from "react";
import VillifeToastMessage from "../../../../../../../common/atoms/toast";
import { StardustAlertContent } from "../../../../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../../../../common/blocks/universial/stardust_alert";
import StardustDateParser from "../../../../../../../../libs/date_parser";
import useRenterMFViewModel from "../../../../../viewmodel/renter";

export default function ManagementFeeBox(props: ManagementFeeBoxProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const user = useUserInformation();
    const viewModel = useRenterMFViewModel();
    const [dueDate, setDueDate] = useState<Date | null>(null);
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

    useEffect(() => {
        if (props.feeToPay !== undefined && props.feeToPay > 0) {
            viewModel.getBuildingInfo().then((r) => {
                if (r === null) {
                    setDueDate(r);
                    return;
                }
                const date = StardustDateParser.changeGMT(new Date(), "kr");
                date.setDate(date.getDate() + r.mfDueDate);
                setDueDate(date);
            });
        }
    }, [props.feeToPay]);

    const insertCommaToMoney = (money: number): string => {
        if (money == undefined) return "0";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handlePressPaymentBtn = (type: "card" | "account") => {
        if (props.feeToPay !== undefined) {
            if (type === "card") {
                navigation.navigate("confirm_payment_cost", {
                    title: "관리비 결제하기",
                    product_id: 0, //props.manangementFee.bill_id,
                    product_name: "?",
                    product_type: "pt_management_fee",
                    price: 10, //props.manangementFee.amount_won,
                    bill: {
                        관리용역비: 20000,
                        일반관리비: 45000,
                        소독비: 100,
                        화재보험료: 100,
                        수선유지비: 100,
                    },
                });
            } else {
                navigation.navigate("wire_amount_manually", {
                    amount_won: props.feeToPay,
                });
            }
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
        if (viewModel.user.roomNumber === undefined) {
            VillifeToastMessage.showBottomToast("error", "사용자의 호수가 확인되지 않습니다.");
            return;
        }

        const result = await viewModel.requestPaymentConfirmation({
            amountWon: props.feeToPay,
            billIds: viewModel.data.filter((h) => !h.isPaid).map((h) => h.billId),
            depositorName: viewModel.user?.roomNumber.toString() ?? "Unknown",
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
            <View style={props.styles.contentWrapper}>
                <View style={props.styles.header}>
                    <Text style={props.styles.headerText}>{user?.roomNumber}호 </Text>
                    {dueDate !== null && (
                        <>
                            <Text style={[props.styles.headerText, props.styles.dueDate]}>
                                관리비 납부 마감일 {dueDate.getUTCMonth() + 1}월 {dueDate.getUTCDate()}일
                            </Text>
                        </>
                    )}
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
                        <View style={props.styles.paymentBtnCombo}>
                            <TouchableOpacity
                                style={[props.styles.paymentBtn]}
                                activeOpacity={0.6}
                                onPress={() => handlePressPaymentBtn("card")}
                                disabled={props.feeToPay === 0}>
                                <Text style={[props.styles.paymentBtnText]}>{/* 결제하기 */}카드결제</Text>
                            </TouchableOpacity>
                            <Text style={props.styles.paymentBtnSeparator}>|</Text>
                            <TouchableOpacity
                                style={[props.styles.paymentBtn]}
                                activeOpacity={0.6}
                                onPress={() => handlePressPaymentBtn("account")}
                                disabled={props.feeToPay === 0}>
                                <Text style={[props.styles.paymentBtnText]}>{/* 결제하기 */}계좌이체</Text>
                            </TouchableOpacity>
                        </View>
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
        </View>
    );
}
