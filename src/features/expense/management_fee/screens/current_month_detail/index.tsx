import { ScrollView, Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useManagementFeeDetailScreenStyles from "./styles";
import ManagementFeeDetailScreenProps from "./types";
import { useMemo } from "react";
import { insertCommaToNumber } from "../../../../common/global_function";
import RefundPolicyButton from "../../../payment/screens/refund_policy/blocks/button";
import { PaymentBill } from "../../viewmodel/renter/types";

export default function ManagementFeeCurrentMonthDetailScreen({ navigation, route }: ManagementFeeDetailScreenProps) {
    const styles = useManagementFeeDetailScreenStyles();
    //const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const user = useUserInformation();
    const paymentBill = useMemo<PaymentBill>(() => route.params, [route.params]);

    return (
        <NavigationView
            headerOptions={{
                title: "상세내역",
                style: {
                    borderBottomColor: styles.main.navContainer.color,
                    backgroundColor: styles.main.navContainer.color,
                },
            }}
            bodyOptions={{
                backgroundColor: styles.main.navContainer.color,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={["이번 달 관리비 상세내역"]}
                subtitles={["이번 달 관리비 상세내역입니다. 확인 후 이체하기를 눌러주세요."]}
                disablePaddingTop={true}
                bottomButton={{
                    title: "이체하기",
                    onPress: () => {
                        navigation.navigate("wire_amount_manually", {
                            amount_won: route.params.unpaidFee,
                        });
                    },
                }}>
                <ScrollView style={styles.main.container}>
                    <View style={styles.main.totalBox}>
                        <Text style={styles.main.headerText}>{user?.roomNumber}호 관리비</Text>
                        <Text style={styles.main.total}>{insertCommaToNumber(paymentBill.feeToPay)}원</Text>
                    </View>
                    <Text style={styles.main.billBoxTitle}>청구금액</Text>
                    <View style={styles.main.billBox}>
                        <BillRow
                            rowKey={"당월 부과액"}
                            rowValue={`${insertCommaToNumber(paymentBill.currentMonthlyCharge)}원`}
                            subitems={[
                                {
                                    key: "관리비",
                                    value: `${insertCommaToNumber(paymentBill.currentMonthlyCharge)}원`,
                                },
                            ]}
                        />
                        <BillRow rowKey={"미납 연체료"} rowValue={`${insertCommaToNumber(paymentBill.lateFee)}원`} />
                        <BillRow rowKey={"미납액"} rowValue={`${insertCommaToNumber(paymentBill.unpaidFee)}원`} />
                    </View>
                    <View style={styles.main.termsBox}>
                        <RefundPolicyButton />
                    </View>
                </ScrollView>
            </ScreenTitleView>
        </NavigationView>
    );
}

function BillRow(props: BillRowProps) {
    const styles = useManagementFeeDetailScreenStyles().card;

    return (
        <>
            <View style={styles.row}>
                <Text style={styles.key}>{props.rowKey}</Text>
                <Text style={styles.value}>{props.rowValue}</Text>
            </View>
            {props.subitems?.map((item, i) => (
                <View key={i} style={styles.subitemRow}>
                    <Text style={styles.subitemKey}>{item.key}</Text>
                    <Text style={styles.subitemValue}>{item.value}</Text>
                </View>
            ))}
        </>
    );
}

type BillRowProps = {
    rowKey: string;
    rowValue: string | undefined;
    subitems?: BillSubitem[];
};

type BillSubitem = {
    key: string;
    value: string;
};
