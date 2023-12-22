import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import MFSelectToDoSomethingScreenProps from "./types";
import useMFDepositCheckScreenStyles from "./styles";
import { useEffect, useState } from "react";
import MFHistoryCardView from "../../blocks/card";
import Icon from "../../../../common/atoms/icon";
import StardustModal from "../../../../common/blocks/universial/stardust_modal";
import { makeChunk } from "../../../../common/global_function";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useAdminMFViewModel from "../../viewmodel/admin";
import { BuildingMFHistory } from "../../viewmodel/admin/types";

export default function MFSelectToDoSomethingScreen({ navigation, route }: MFSelectToDoSomethingScreenProps) {
    const styles = useMFDepositCheckScreenStyles();
    const [depositCheckModalVisible, setDepositCheckModalVisible] = useState<boolean>(false);
    const [fees, setFees] = useState<BuildingMFHistory[]>([]);
    /* 
        if selectAll is true => "전체 선택" 상태
        if selectAll is false => "전체 선택" 상태 해제로 일괄 선택 해제
        if selectAll is null => "전체 선택" 상태에서 부분 항목 선택 해제로 인한 "전체 선택" 상태 해제
    */
    const [selectAll, setSelectAll] = useState<boolean | null>(null);
    const [checkedFees, setCheckedFees] = useState<BuildingMFHistory[]>([]);

    const viewModel = useAdminMFViewModel();

    useEffect(() => {
        setFees(JSON.parse(route.params.fees));
    }, [route.params.fees]);

    useEffect(() => {
        selectAll === false && setCheckedFees([]);
    }, [selectAll]);

    const confirm = async () => {
        for (const fee of checkedFees) {
            const failed = await viewModel.confirmPaymentRequest({
                unpaidBills: fee.unpaidBills,
            });
            console.log(fee.roomNumber, failed);
        }

        await viewModel.update();

        VillifeToastMessage.showBottomToast("success", "입금을 확인했어요! 잘 처리 되었는지 꼭 확인해주세요.");

        navigation.canGoBack() && navigation.goBack();
    };

    const pressBottomBtn = () => {
        if (route.params.dowhat === "confirm-deposit") {
            setDepositCheckModalVisible(true);
        } else {
            for (const fee of checkedFees) {
                console.log("select", fee.roomNumber);

                navigation.navigate("expense_compose_message", {
                    room_numbers: checkedFees.map((f) => f.roomNumber),
                });
            }
        }
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
                modalVisible={depositCheckModalVisible}
                setModalVisible={setDepositCheckModalVisible}
                buttons={[
                    {
                        text: "취소",
                        onPress: () => setDepositCheckModalVisible(false),
                    },
                    {
                        text: "확인",
                        onPress: async () => {
                            await confirm();
                            setDepositCheckModalVisible(false);
                        },
                    },
                ]}>
                <View style={styles.confirmModalContainer}>
                    {makeChunk(checkedFees, 5).map((chunk, i) => (
                        <View key={i} style={styles.confirmModalRow}>
                            {chunk.map((fee) => (
                                <Text
                                    key={fee.roomNumber}
                                    style={styles.confirmModalTxt}
                                    adjustsFontSizeToFit
                                    numberOfLines={1}>
                                    {fee.roomNumber}
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
                                disabled: route.params.dowhat === "message-to" ? false : fee.totalUnpaidFee === 0,
                                onCheck: (check) => {
                                    if (check) {
                                        if (!checkedFees.find((v) => v.roomNumber === fee.roomNumber)) {
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
                                        setCheckedFees([...checkedFees.filter((v) => v.roomNumber !== fee.roomNumber)]);
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
                        onPress={() => pressBottomBtn()}
                        disabled={checkedFees.length === 0}>
                        <Text style={styles.bottomBtnTxt}>
                            {route.params.dowhat === "confirm-deposit" ? "입금 확인하기" : "메세지 작성하기"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </NavigationView>
    );
}
