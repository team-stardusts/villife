import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ScreenTitleView from "../../../../common/blocks/title_view";
import useUserInformation from "../../../../common/hooks/service/user_info";
import useManagementFeeDetailScreenStyles from "./styles";
import ManagementFeeDetailScreenProps, { PaidDateRange, SelectedDate } from "./types";
import usePayer from "../../services/payer";
import { useEffect, useState } from "react";
import Icon from "../../../../common/atoms/icon";
import SelectModal from "./blocks/select_modal";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export default function ManagementFeeDetailScreen({ navigation, route }: ManagementFeeDetailScreenProps) {
    const styles = useManagementFeeDetailScreenStyles();
    const payer = usePayer();
    const user = useUserInformation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [paidDR, setPaidDR] = useState<PaidDateRange>({});
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const [selectedFee, setSelectedFee] = useState<ManagementFee.ManagementFee | undefined>(undefined);

    useEffect(() => {
        const _paidPR: PaidDateRange = {};

        payer.history.user.forEach((fee) => {
            if (Object.keys(_paidPR).find((year) => parseInt(year) === fee.year)) {
                if (!_paidPR[fee.year].find((month) => month === fee.month)) {
                    _paidPR[fee.year].push(fee.month);
                }
                return;
            }

            _paidPR[fee.year] = [fee.month];
        });

        setPaidDR({ ..._paidPR });

        if (payer.history.thisMonthBillOfUser) {
            setSelectedDate({
                year: payer.history.thisMonthBillOfUser?.year,
                month: payer.history.thisMonthBillOfUser?.month,
            });
        }
    }, []);

    useEffect(() => {
        if (selectedDate === null) return;
        const _fee = payer.history.user.find(
            (fee) => fee.year === selectedDate.year && fee.month === selectedDate.month
        );

        setSelectedFee(_fee);
    }, [selectedDate]);

    const insertCommaToMoney = (money: number | undefined): string => {
        if (money === undefined || money === null) return "-";
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            <ScreenTitleView titles={[`그린파크 ${user?.roomNumber}호`]} disablePaddingTop={true}>
                <SelectModal modalVisible={modalVisible} setModalVisible={setModalVisible} paidDateRange={paidDR} />
                <TouchableOpacity
                    style={styles.main.selector}
                    activeOpacity={0.4}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.main.selectorText}>
                        {selectedDate?.year}년 {selectedDate?.month}월분
                    </Text>
                    <Icon
                        name="arrow-down"
                        size={styles.main.selectorIcon.width}
                        color={styles.main.selectorIcon.color}
                    />
                </TouchableOpacity>
                <View style={styles.main.container}>
                    <View style={styles.main.totalBox}>
                        <Text style={styles.main.total}>{insertCommaToMoney(selectedFee?.amount_won)} 원</Text>
                    </View>
                    <ScrollView style={styles.main.billBox}></ScrollView>
                </View>
            </ScreenTitleView>
        </NavigationView>
    );
}
