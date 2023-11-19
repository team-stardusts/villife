import { Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useManagementFeeDetailScreenStyles from "./styles";
import ManagementFeeDetailScreenProps, { PaidDateRange, SelectedDate } from "./types";
import { useEffect, useState } from "react";
import Icon from "../../../../common/atoms/icon";
import SelectModal from "./blocks/select_modal";
import useManagementFeeManager from "../../services/payment";
import { PaymentBill, UserPaymentManagerBase } from "../../services/payment/types";
import { insertCommaToNumber } from "../../../../common/global_function";
import SpinningWon from "../../blocks/icon/spinning_won";

export default function ManagementFeeDetailScreen({ navigation, route }: ManagementFeeDetailScreenProps) {
    const styles = useManagementFeeDetailScreenStyles();
    const manager: UserPaymentManagerBase = useManagementFeeManager() as UserPaymentManagerBase;
    const user = useUserInformation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [paidDateRange, setPaidDateRaange] = useState<PaidDateRange>({}); // 납부 기간
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const [billOfMonth, setBillOfMonth] = useState<PaymentBill | null>(null);

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

        setPaidDateRaange({ ..._paidPR });

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

        if (_fee !== undefined) {
            setBillOfMonth(manager.calcByPaymentItem([_fee]));
        }
    }, [selectedDate]);

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
                    initailSelectedDate={selectedDate}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    paidDateRange={paidDateRange}
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
                        <SpinningWon />
                        <Text style={styles.main.totalMF}>{insertCommaToNumber(billOfMonth?.feeToPay ?? 0)} 원</Text>
                    </View>
                    <View style={styles.main.billBox}>
                        <View style={styles.main.billBoxTitleBox}>
                            <Text style={styles.main.billBoxTitle}>청구금액</Text>
                        </View>
                        <View style={styles.main.billBoxRow}>
                            <Text style={styles.main.billBoxRowMajorKey}>당월 부과액</Text>
                            <Text style={styles.main.billBoxRowMajorValue}>
                                {insertCommaToNumber(billOfMonth?.currentMonthlyCharge ?? 0)} 원
                            </Text>
                        </View>
                        <View style={styles.main.billBoxRow}>
                            <Text style={styles.main.billBoxRowMinorKey}>관리비</Text>
                            <Text style={styles.main.billBoxRowMinorValue}>
                                {insertCommaToNumber(billOfMonth?.currentMonthlyCharge ?? 0)} 원
                            </Text>
                        </View>
                        <View style={styles.main.billBoxRow}>
                            <Text style={styles.main.billBoxRowMajorKey}>연체료</Text>
                            <Text style={styles.main.billBoxRowMajorValue}>
                                {insertCommaToNumber(billOfMonth?.lateFee ?? 0)} 원
                            </Text>
                        </View>
                    </View>
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}
