import { ScrollView, Text, TextBase, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useManagementFeeDetailScreenStyles from "./styles";
import ManagementFeeDetailScreenProps, { PaidDateRange } from "./types";
import usePayer from "../../services/payer_legacy";
import { useEffect, useState } from "react";
import Icon from "../../../../common/atoms/icon";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import useManagementFeeManager from "../../services/payment";
import { UserPaymentManagerBase } from "../../services/payment/types";
import { insertCommaToNumber } from "../../../../common/global_function";
import { SelectedDate } from "../detail/types";
import RefundPolicyButton from "../../../payment/screens/refund_policy/blocks/button";

export default function ManagementFeeCurrentMonthDetailScreen(props: ManagementFeeDetailScreenProps) {
    const styles = useManagementFeeDetailScreenStyles();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const user = useUserInformation();

    /* useEffect(() => {
        const _paidPR: PaidDateRange = {};

        manager.history.forEach((fee) => {
            if (Object.keys(_paidPR).find((year) => parseInt(year) === fee.year)) {
                if (!_paidPR[fee.year].find((month) => month === fee.month)) {
                    _paidPR[fee.year].push(fee.month);
                }
                return;
            }

            _paidPR[fee.year] = [fee.month];
        });

        setPaidDR({ ..._paidPR });

        if (manager.history.length > 0) {
        }
    }, [manager.history]); */

    /* useEffect(() => {
        if (selectedDate === null) return;

        const _fee = manager.history.find((fee) => fee.year === selectedDate.year && fee.month === selectedDate.month);

        setSelectedFee(_fee);
    }, [selectedDate]); */

    const currentMonthFee = manager.history[manager.history.length - 1]?.amount_won;
    const unpaidFee =
        props.route.params && props.route.params.amount_won && manager.history.length > 0
            ? props.route.params.amount_won - (currentMonthFee || 0)
            : 0;

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
                        props.navigation.navigate("wire_amount_manually", {
                            amount_won: props.route.params?.amount_won,
                        });
                    },
                }}>
                <ScrollView style={styles.main.container}>
                    <View style={styles.main.totalBox}>
                        <Text style={styles.main.headerText}>{user?.roomNumber}호 관리비</Text>
                        <Text style={styles.main.total}>
                            {insertCommaToNumber(
                                props.route.params?.amount_won ? props.route.params?.amount_won + unpaidFee * 0.12 : 0
                            )}
                            원
                        </Text>
                    </View>
                    <Text style={styles.main.billBoxTitle}>청구금액</Text>
                    <View style={styles.main.billBox}>
                        <CardRow rowKey={"당월 부과액"} rowValue={`${insertCommaToNumber(currentMonthFee)}`} />
                        <CardRow rowKey={"미납액"} rowValue={`${insertCommaToNumber(unpaidFee)}`} />
                        <CardRow rowKey={"미납 연체료"} rowValue={`${insertCommaToNumber(unpaidFee * 0.12)}`} />
                    </View>
                    <View style={styles.main.termsBox}>
                        <RefundPolicyButton />
                    </View>
                </ScrollView>
            </ScreenTitleView>
        </NavigationView>
    );
}

function CardRow(props: CardRowProps) {
    const styles = useManagementFeeDetailScreenStyles().card;

    return (
        <View style={styles.cardRow}>
            <Text style={styles.cardRowKey}>{props.rowKey}</Text>
            <Text style={styles.cardRowValue}>{props.rowValue ?? ""}</Text>
        </View>
    );
}

type CardRowProps = {
    rowKey: string;
    rowValue: string | undefined;
};
