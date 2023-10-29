import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingMFHistoryScreenProps from "./types";
import useBuildingMFHistoryScreenStyles from "./styles";
import ScreenTopFilter from "../../../../common/blocks/top_filter";
import { AdminPaymentManagerBase } from "../../services/payment/types";
import useManagementFeeManager from "../../services/payment";
import { useEffect, useState } from "react";
import { Filter } from "../../../../common/blocks/top_filter/types";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import buildingManagementFeeFilter from "./filter";
import MFHistoryCardView from "../../blocks/card";

export default function BuildingMFHistoryScreen({ navigation, route }: BuildingMFHistoryScreenProps) {
    const styles = useBuildingMFHistoryScreenStyles();

    const manager: AdminPaymentManagerBase = useManagementFeeManager() as AdminPaymentManagerBase;
    const [filters, setFilters] =
        useState<Filter<ManagementFee.BuildingRenterMFHistory>[]>(buildingManagementFeeFilter);
    const [filteredHistory, setFilteredHistory] = useState<ManagementFee.BuildingRenterMFHistory[]>([]);

    useEffect(() => {
        setFilterFloors();
    }, [manager.history]);

    const setFilterFloors = () => {
        let floors = manager.history.map((f) => Math.floor(f.room_number / 100).toString());

        // 중복 제거
        floors = floors
            .filter((f, i) => {
                return floors.indexOf(f) === i;
            })
            .sort();

        const floorFilterIndex = filters.findIndex((f) => f.name === "층");

        if (floorFilterIndex === -1) {
            Alert.alert("필터에서 예기치 않은 문제가 발생했습니다.");
            navigation.reset({ index: 0, routes: [{ name: "home" }] });
        }

        const _filter = [...filters];
        _filter[floorFilterIndex].conditions = floors;

        setFilters([..._filter]);
    };

    return (
        <NavigationView
            headerOptions={{
                title: "관리비 현황 보기",
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}>
                <ScreenTopFilter
                    style={styles.filterBase}
                    filterStyle={{
                        selectedBorderColor: styles.selectedFilter.borderColor,
                        selectedBackgroundColor: styles.selectedFilter.backgroundColor,
                        backgroundColor: styles.filter.backgroundColor,
                    }}
                    data={manager.history}
                    onFilterData={(data: ManagementFee.BuildingRenterMFHistory[]) => {
                        const _filteredHistory = data.sort((a, b) => {
                            if (a.room_number > b.room_number) {
                                return 1;
                            } else if (a.room_number < b.room_number) {
                                return -1;
                            }
                            return 0;
                        });

                        setFilteredHistory([..._filteredHistory]);
                    }}
                    filters={filters}
                />
                <View style={styles.wrapper}>
                    <View style={styles.fcBtnWrapper}>
                        <TouchableOpacity
                            style={[
                                styles.depositCheckBtn,
                                filteredHistory.filter((v) => v.total_unpaid_fee > 0).length === 0 &&
                                    styles.depositCheckBtnDisabled,
                            ]}
                            activeOpacity={0.6}
                            disabled={filteredHistory.filter((v) => v.total_unpaid_fee > 0).length === 0}
                            onPress={() => {
                                navigation.navigate("mf_deposit_check", {
                                    fees: JSON.stringify(filteredHistory),
                                });
                            }}>
                            <Text
                                style={[
                                    styles.depositCheckTxt,
                                    filteredHistory.filter((v) => v.total_unpaid_fee > 0).length === 0 &&
                                        styles.depositCheckTxtDisabled,
                                ]}
                                adjustsFontSizeToFit
                                numberOfLines={1}>
                                입금 확인하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        {filteredHistory.map((element, index, elements) => (
                            <MFHistoryCardView
                                key={index}
                                index={index}
                                totalCardCount={elements.length}
                                {...element}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </NavigationView>
    );
}
