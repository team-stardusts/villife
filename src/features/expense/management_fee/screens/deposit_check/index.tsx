import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import MFDepositCheckScreenProps from "./types";
import useMFDepositCheckScreenStyles from "./styles";
import { AdminPaymentManagerBase } from "../../services/payment/types";
import useManagementFeeManager from "../../services/payment";
import { useEffect, useState } from "react";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import MFHistoryCardView from "../../blocks/card";

export default function MFDepositCheckScreen({ navigation, route }: MFDepositCheckScreenProps) {
    const styles = useMFDepositCheckScreenStyles();
    const [fees, setFees] = useState<ManagementFee.BuildingRenterMFHistory[]>([]);
    const [checkedFees, setCheckedFees] = useState<ManagementFee.BuildingRenterMFHistory[]>([]);

    const manager: AdminPaymentManagerBase = useManagementFeeManager() as AdminPaymentManagerBase;

    useEffect(() => {
        setFees(JSON.parse(route.params.fees));
    }, [route.params.fees]);

    return (
        <NavigationView
            headerOptions={{
                title: "취소",
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {fees.map((fee, index, elements) => (
                        <MFHistoryCardView
                            key={index}
                            index={index}
                            totalCardCount={elements.length}
                            checkmode={{
                                disabled: fee.total_unpaid_fee === 0,
                                onCheck: console.log,
                            }}
                            {...fee}
                        />
                    ))}
                </ScrollView>
                <View style={styles.bottomBtnWrapper}>
                    <TouchableOpacity
                        style={styles.bottomBtn}
                        activeOpacity={0.6}
                        onPress={() => {
                            console.log("Hello");
                        }}>
                        <Text style={styles.bottomBtnTxt}>입금 확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </NavigationView>
    );
}
