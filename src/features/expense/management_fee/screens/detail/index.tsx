import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useManagementFeeDetailScreenStyles from "./styles";
import ManagementFeeDetailScreenProps, { PaidDateRange, SelectedDate } from "./types";
import usePayer from "../../services/payer_legacy";
import { useEffect, useState } from "react";
import Icon from "../../../../common/atoms/icon";
import SelectModal from "./blocks/select_modal";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import useManagementFeeManager from "../../services/payment";
import { UserPaymentManagerBase } from "../../services/payment/types";
import { insertCommaToNumber } from "../../../../common/global_function";

export default function ManagementFeeDetailScreen({ navigation, route }: ManagementFeeDetailScreenProps) {
    const styles = useManagementFeeDetailScreenStyles();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const user = useUserInformation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [paidDR, setPaidDR] = useState<PaidDateRange>({}); // Paid date range
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const [selectedFee, setSelectedFee] = useState<ManagementFee.ManagementFee | undefined>(undefined);
    const [feeOfSelectedMonth, setFeeOfSelectedMonth] = useState<number>(0);

    // 고지 받은 기간을 추려 선택 가능한 Year, Month 정리
    useEffect(() => {
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

        // Initial SelectedDate를 가장 최근 고지월로 설정
        if (manager.history.length > 0) {
            setSelectedDate({
                year: manager.history[manager.history.length - 1].year,
                month: manager.history[manager.history.length - 1].month,
            });
        }
    }, [manager.history]);

    useEffect(() => {
        if (selectedDate === null) return;

        // SelectedDate에 해당하는 fee를 선택
        const _fee = manager.history.find((fee) => fee.year === selectedDate.year && fee.month === selectedDate.month);

        setSelectedFee(_fee);
    }, [selectedDate]);

    useEffect(() => {
        let total = 0;

        if (selectedFee?.amount_won !== undefined) total += selectedFee.amount_won;
        if (selectedFee?.overdue_interest !== undefined) total += selectedFee.overdue_interest;

        setFeeOfSelectedMonth(total);
    }, [selectedFee]);

    const make2Digit = (num: number | undefined): string => {
        if (num === undefined) return "0";

        if (num >= 10) {
            return num.toString();
        } else {
            return "0" + num.toString();
        }
    };

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
            <ScreenTitleView titles={[`${user?.roomNumber}호`]} disablePaddingTop={true}>
                <SelectModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    paidDateRange={paidDR}
                    onPick={setSelectedDate}
                />
                <TouchableOpacity
                    style={styles.main.selector}
                    activeOpacity={0.4}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.main.selectorText}>
                        {selectedDate?.year}년 {make2Digit(selectedDate?.month)}월분
                    </Text>
                    <Icon
                        name="arrow-down"
                        size={styles.main.selectorIcon.width}
                        color={styles.main.selectorIcon.color}
                    />
                </TouchableOpacity>
                <View style={styles.main.container}>
                    <View style={styles.main.totalMFBox}>
                        <Text style={styles.main.totalMF}>{insertCommaToNumber(feeOfSelectedMonth)} 원</Text>
                    </View>
                    <View style={styles.main.billBox}>
                        <View style={styles.main.billBoxTitleBox}>
                            <Text style={styles.main.billBoxTitle}>청구금액</Text>
                        </View>
                        <View style={styles.main.billBoxRow}>
                            <Text style={styles.main.billBoxRowMajorKey}>당월 부과액</Text>
                            <Text style={styles.main.billBoxRowMajorValue}>
                                {insertCommaToNumber(feeOfSelectedMonth ?? 0)} 원
                            </Text>
                        </View>
                        <View style={styles.main.billBoxRow}>
                            <Text style={styles.main.billBoxRowMinorKey}>관리비</Text>
                            <Text style={styles.main.billBoxRowMinorValue}>
                                {insertCommaToNumber(selectedFee?.amount_won ?? 0)} 원
                            </Text>
                        </View>
                        <View style={styles.main.billBoxRow}>
                            <Text style={styles.main.billBoxRowMinorKey}>미납 연체료</Text>
                            <Text style={styles.main.billBoxRowMinorValue}>
                                {insertCommaToNumber(selectedFee?.overdue_interest ?? 0)} 원
                            </Text>
                        </View>
                        <View style={styles.main.billBoxRow}>
                            <Text style={styles.main.billBoxRowMajorKey}>미납액</Text>
                            <Text style={styles.main.billBoxRowMajorValue}>
                                {insertCommaToNumber(selectedFee?.is_paid ? 0 : feeOfSelectedMonth)} 원
                            </Text>
                        </View>
                    </View>
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}
