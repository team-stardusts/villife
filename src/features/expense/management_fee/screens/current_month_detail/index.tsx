import { ScrollView, Text, TextBase, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useManagementFeeDetailScreenStyles from "./styles";
import ManagementFeeDetailScreenProps from "./types";
import { useEffect, useState } from "react";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import useManagementFeeManager from "../../services/payment";
import { UserPaymentManagerBase } from "../../services/payment/types";
import { insertCommaToNumber } from "../../../../common/global_function";
import RefundPolicyButton from "../../../payment/screens/refund_policy/blocks/button";
import VillifeToastMessage from "../../../../common/atoms/toast";

export default function ManagementFeeCurrentMonthDetailScreen({ navigation, route }: ManagementFeeDetailScreenProps) {
    const styles = useManagementFeeDetailScreenStyles();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const user = useUserInformation();
    const [thisMonthMF, setThisMonthMF] = useState<ManagementFee.ManagementFee | null>(null);

    useEffect(() => {
        if (manager.history.length > 0) {
            const _thisMonthMF = manager.history[manager.history.length - 1];
            const today = new Date();

            if (today.getFullYear() === _thisMonthMF.year && today.getMonth() + 1 === _thisMonthMF.month) {
                setThisMonthMF(_thisMonthMF);

                return;
            } else {
                VillifeToastMessage.showBottomToast("info", "아직 이번 달 관리비가 고지되지 않았어요.");
            }
        }
        // 이번 달 관리비 상세내역 진입 조건이 금월 관리비가 0원 이상인 경우 이므로
        // Else 분기는 필요 없음
    }, []);

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
                        <Text style={styles.main.total}>{insertCommaToNumber(route.params.unpaidFee)}원</Text>
                    </View>
                    <Text style={styles.main.billBoxTitle}>청구금액</Text>
                    <View style={styles.main.billBox}>
                        <CardRow
                            rowKey={"당월 관리비"}
                            rowValue={`${insertCommaToNumber(thisMonthMF?.amount_won ?? 0)}`}
                        />
                        <CardRow
                            rowKey={"당월 연체료"}
                            rowValue={`${insertCommaToNumber(thisMonthMF?.overdue_interest ?? 0)}`}
                        />
                        <CardRow
                            rowKey={"누적 연체료"}
                            rowValue={`${insertCommaToNumber(
                                route.params.unpaidFee -
                                    (thisMonthMF?.amount_won ?? 0) -
                                    (thisMonthMF?.overdue_interest ?? 0)
                            )}`}
                        />
                        <CardRow rowKey={"미납액"} rowValue={`${insertCommaToNumber(route.params.unpaidFee)}`} />
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
