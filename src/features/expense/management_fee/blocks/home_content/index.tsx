import { Animated, Text, TouchableOpacity, View } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useHomeContentFromManagementFeeStyles from "./styles";
import usePayer from "../../services/payer";
import { useEffect, useState } from "react";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import SpinningWon from "../icon/spinning_won";
import { insertCommaToNumber } from "../../../../common/global_function";
import { UserPaymentManagerBase } from "../../services/payment/types";
import useManagementFeeManager from "../../services/payment";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export default function HomeContentFromManagementFee() {
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useHomeContentFromManagementFeeStyles();
    const user = useUserInformation();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const [unpaidFee, setUnpaidFee] = useState<number>(0);

    useEffect(() => {
        manager.updateHistory();
    }, []);

    useEffect(() => {
        let _unpaidFee = 0;

        manager.history.forEach((v) => {
            if (v.is_paid === false) {
                _unpaidFee += v.amount_won;
            }
        });

        setUnpaidFee(_unpaidFee);
    }, [manager.history]);

    const handlePressPaymentBtn = () => {
        if (unpaidFee) {
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
            navigation.navigate("wire_amount_manually", {
                amount_won: unpaidFee,
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
                    {<Text style={styles.headerText}>{user?.roomNumber}호 납부 필요 관리비</Text>}
                </View>
                <View style={styles.body}>
                    <View style={styles.managementFeeBox}>
                        <SpinningWon size={20} />
                        {<Text style={styles.managementFee}>{insertCommaToNumber(unpaidFee)}원</Text>}
                    </View>
                    {unpaidFee !== 0 && (
                        <TouchableOpacity style={styles.paymentBtn} activeOpacity={0.6} onPress={handlePressPaymentBtn}>
                            <Text style={styles.paymentText}>{/* 결제하기 */}이체하기</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </MiniContent>
    );
}
