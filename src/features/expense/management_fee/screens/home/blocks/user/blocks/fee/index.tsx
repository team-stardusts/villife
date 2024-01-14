import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../../../common/router/types";
import SpinningWon from "../../../../../../blocks/icon/spinning_won";
import useUserInformation from "../../../../../../../../common/hooks/service/user_info";
import { useEffect, useMemo, useState } from "react";
import useRenterMFViewModel from "../../../../../../viewmodel/renter";
import { ManagementFeeBoxProps } from "./types";
import useManagementFeeBoxStyles from "./styles";

import { insertCommaToNumber } from "../../../../../../../../common/global_function";
import { Villife } from "@team-stardusts/villife-client";

export default function ManagementFeeBox(props: ManagementFeeBoxProps) {
    const stylesOrigin = useManagementFeeBoxStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const user = useUserInformation();
    const viewModel = useRenterMFViewModel();
    const [building, setBuilding] = useState<Villife.Contract.Building | null>(null);

    const styles = useMemo(() => {
        if (props.customStyles) return props.customStyles;
        return stylesOrigin;
    }, [props.customStyles]);

    const dueDate = useMemo<Date | null>(() => {
        if (building === null || props.billCreatedAt === undefined) return null;

        const date = new Date(props.billCreatedAt);
        date.setDate(date.getDate() + building.mfDueDate);

        return date;
    }, [props.billCreatedAt, building]);

    useEffect(() => {
        if (props.bill !== null && props.bill.feeToPay > 0) {
            viewModel.getBuildingInfo().then(setBuilding);
        }
    }, [props.bill]);

    const handlePressPaymentBtn = () => {
        if (props.bill !== null) {
            const cardServiceFee = Math.floor(props.bill.feeToPay * 0.05);
            navigation.navigate("confirm_payment_cost", {
                title: "관리비 결제하기",
                product_id: props.bill.latestBillId,
                product_name: "관리비",
                product_type: "pt_management_fee",
                price: props.bill.feeToPay + cardServiceFee,
                tax_free_amount: props.bill.feeToPay,
                bill: {
                    당월부과액: props.bill.currentMonthlyCharge,
                    연체이자: props.bill.lateFee,
                    미납액: props.bill.unpaidFee,
                    서비스이용료: cardServiceFee,
                    총액: props.bill.feeToPay + cardServiceFee,
                },
            });
            /* Alert.alert("카드 결제는 체험 기능이에요!", "한 번 체험 해보시겠어요?\n실제로 출금되지는 않습니다.", [
                {
                    text: "취소",
                },
                {
                    text: "확인",
                    onPress: () => {
                        if (props.bill !== null) {
                            const cardServiceFee = Math.floor(props.bill.feeToPay * 0.05);
                            navigation.navigate("confirm_payment_cost", {
                                title: "관리비 결제하기",
                                product_id: props.bill.latestBillId,
                                product_name: "관리비",
                                product_type: "pt_management_fee",
                                price: props.bill.feeToPay + cardServiceFee,
                                tax_free_amount: props.bill.feeToPay, //props.manangementFee.amount_won,
                                bill: {
                                    당월부과액: props.bill.currentMonthlyCharge,
                                    연체이자: props.bill.lateFee,
                                    미납액: props.bill.unpaidFee,
                                    서비스이용료: cardServiceFee,
                                    총액: props.bill.feeToPay + cardServiceFee,
                                },
                            });
                        }
                    },
                },
            ]); */
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {building && building.buildingName + " "}
                        {user?.roomNumber}호 {props.billCreatedAt && `${props.billCreatedAt.getMonth() + 1}월`} 관리비
                    </Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.managementFeeBox}>
                        <SpinningWon size={20} />
                        {
                            <Text style={styles.managementFee}>
                                {props.bill ? insertCommaToNumber(props.bill.feeToPay) : "0"}원
                            </Text>
                        }
                    </View>
                    {props.bill && props.bill.feeToPay !== 0 && (
                        <View style={styles.paymentBtnCombo}>
                            <TouchableOpacity
                                style={[styles.paymentBtn]}
                                activeOpacity={0.6}
                                onPress={() => handlePressPaymentBtn()}
                                disabled={props.bill?.feeToPay === 0}>
                                <Text style={[styles.paymentBtnText]}>카드결제</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={styles.paymentDeadlineBox}>
                    {props.bill && props.bill.feeToPay > 0 && dueDate !== null && (
                        <>
                            <Text style={[styles.headerText, styles.dueDate]}>
                                납부 마감일 {dueDate.getUTCMonth() + 1}월 {dueDate.getUTCDate()}일
                            </Text>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}
