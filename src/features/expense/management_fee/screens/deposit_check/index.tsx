import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import MFDepositCheckScreenProps from "./types";
import useMFDepositCheckScreenStyles from "./styles";
import { AdminPaymentManagerBase } from "../../services/payment/types";
import useManagementFeeManager from "../../services/payment";
import { useEffect, useState } from "react";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import MFHistoryCardView from "../../blocks/card";
import Icon from "../../../../common/atoms/icon";
import StardustModal from "../../../../common/blocks/universial/stardust_modal";

export default function MFDepositCheckScreen({ navigation, route }: MFDepositCheckScreenProps) {
    const styles = useMFDepositCheckScreenStyles();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [fees, setFees] = useState<ManagementFee.BuildingRenterHistory[]>([]);
    /* 
        if selectAll is true => "전체 선택" 상태
        if selectAll is false => "전체 선택" 상태 해제로 일괄 선택 해제
        if selectAll is null => "전체 선택" 상태에서 부분 항목 선택 해제로 인한 "전체 선택" 상태 해제
    */
    const [selectAll, setSelectAll] = useState<boolean | null>(null);
    const [checkedFees, setCheckedFees] = useState<ManagementFee.BuildingRenterHistory[]>([]);

    const manager: AdminPaymentManagerBase = useManagementFeeManager() as AdminPaymentManagerBase;

    useEffect(() => {
        setFees(JSON.parse(route.params.fees));
    }, [route.params.fees]);

    useEffect(() => {
        selectAll === false && setCheckedFees([]);
    }, [selectAll]);

    function makeChunk<T>(data: T[] = [], size: number = 1): T[][] {
        const arr: T[][] = [];

        for (let i = 0; i < data.length; i += size) {
            arr.push(data.slice(i, i + size));
        }

        return arr;
    }

    const confirm = async () => {
        for (const fee of checkedFees) {
            const failed = await manager.requestPaymentConfirmation({
                unpaidBills: fee.unpaid_bills,
            });
            console.log(fee.room_number, failed);
        }

        await manager.updateHistory();
        navigation.canGoBack() && navigation.goBack();
    };

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
            <StardustModal
                title="입금 확인하기"
                subtitle="선택하신 호수를 확인해주세요."
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                buttons={[
                    {
                        text: "취소",
                        onPress: () => setModalVisible(false),
                    },
                    {
                        text: "확인",
                        onPress: async () => {
                            await confirm();
                            setModalVisible(false);
                        },
                    },
                ]}>
                <View style={styles.confirmModalContainer}>
                    {makeChunk(checkedFees, 5).map((chunk, i) => (
                        <View key={i} style={styles.confirmModalRow}>
                            {chunk.map((fee) => (
                                <Text
                                    key={fee.room_number}
                                    style={styles.confirmModalTxt}
                                    adjustsFontSizeToFit
                                    numberOfLines={1}>
                                    {fee.room_number}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            </StardustModal>
            <View style={styles.container}>
                <View style={styles.selectAllWrapper}>
                    <TouchableOpacity
                        style={styles.selectAllBtn}
                        activeOpacity={0.6}
                        onPress={() => setSelectAll(selectAll === null ? true : !selectAll)}>
                        <Icon
                            name="check"
                            size={styles.selectAllIcon.width}
                            color={selectAll === true ? styles.selectAll.color : styles.selectAllIcon.color}
                        />
                        <Text style={[styles.selectAllText, selectAll && styles.selectAll]}>전체 선택</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {fees.map((fee, index, elements) => (
                        <MFHistoryCardView
                            key={index}
                            index={index}
                            totalCardCount={elements.length}
                            checkmode={{
                                checkAll: selectAll,
                                disabled: fee.total_unpaid_fee === 0,
                                onCheck: (check) => {
                                    if (check) {
                                        if (!checkedFees.find((v) => v.room_number === fee.room_number)) {
                                            setCheckedFees((previous) => {
                                                const newVal = [...previous];
                                                newVal.push(fee);
                                                return newVal;
                                            });
                                        }
                                        return;
                                    }

                                    if (selectAll) {
                                        setSelectAll(null);
                                    }

                                    // N회 업데이트 되는 현상 방지
                                    if (checkedFees.length !== 0) {
                                        setCheckedFees([
                                            ...checkedFees.filter((v) => v.room_number !== fee.room_number),
                                        ]);
                                    }
                                },
                            }}
                            {...fee}
                        />
                    ))}
                </ScrollView>
                <View style={styles.bottomBtnWrapper}>
                    <TouchableOpacity
                        style={[styles.bottomBtn, checkedFees.length === 0 && styles.bottomBtnDisabled]}
                        activeOpacity={0.6}
                        onPress={() => setModalVisible(true)}
                        disabled={checkedFees.length === 0}>
                        <Text style={styles.bottomBtnTxt}>입금 확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </NavigationView>
    );
}
