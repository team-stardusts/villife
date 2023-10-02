import { Animated, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useHomeContentFromManagementFeeStyles from "./styles";
import usePayer from "../../services/payer";
import { useEffect } from "react";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import SpinningWon from "../icon/spinning_won";

export default function HomeContentFromManagementFee() {
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useHomeContentFromManagementFeeStyles();
    const user = useUserInformation();
    const payHistory = usePayer().history;

    useEffect(() => {
        payHistory.updateHistory();
    }, [user?.adminInfomation?.selectedBuilding]);

    const insertCommaToMoney = (money: number): string => {
        if (money == undefined) return "0";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handlePressPaymentBtn = () => {
        if (payHistory.thisMonthBillOfUser?.amount_won) {
            navigation.navigate("confirm_payment_cost", {
                title: "관리비 결제하기",
                product_id: payHistory.thisMonthBillOfUser.bill_id,
                product_name: "?",
                product_type: "pt_management_fee",
                price: payHistory.thisMonthBillOfUser.amount_won,
                bill: {
                    관리용역비: 20000,
                    일반관리비: 45000,
                    소독비: 100,
                    화재보험료: 100,
                    수선유지비: 100,
                },
            });
        }
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
            <View style={styles.container}>
                <View style={styles.header}>
                    {
                        /* payHistory.thisMonthBillOfUser && */ <Text style={styles.headerText}>
                            {/* {payHistory.thisMonthBillOfUser.year} */}2023년{" "}
                            {/* {payHistory.thisMonthBillOfUser.month} */}10월 납부할 금액
                        </Text>
                    }
                </View>
                <View style={styles.body}>
                    <View style={styles.managementFeeBox}>
                        <SpinningWon size={20} />
                        {
                            <Text style={styles.managementFee}>
                                {payHistory.thisMonthBillOfUser
                                    ? insertCommaToMoney(payHistory.thisMonthBillOfUser.amount_won)
                                    : "0"}
                                원
                            </Text>
                        }
                    </View>
                    {payHistory.thisMonthBillOfUser !== undefined &&
                        payHistory.thisMonthBillOfUser.amount_won !== 0 && (
                            <TouchableOpacity
                                style={styles.paymentBtn}
                                activeOpacity={0.6}
                                onPress={handlePressPaymentBtn}>
                                <Text style={styles.paymentText}>결제하기</Text>
                            </TouchableOpacity>
                        )}
                </View>
            </View>
        </MiniContent>
    );
}
