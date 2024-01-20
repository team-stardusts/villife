import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingMFHistoryScreenProps from "./types";
import useBuildingMFHistoryScreenStyles from "./styles";
import ScreenTopFilter from "../../../../common/blocks/top_filter";
import { useEffect, useMemo, useState } from "react";
import { Filter } from "../../../../common/blocks/top_filter/types";
import buildingManagementFeeFilter from "./filter";
import MFHistoryCardView from "../../blocks/card";
import Message from "./blocks/message";
import useAdminMFViewModel from "../../viewmodel/admin";
import { BuildingMFHistory } from "../../viewmodel/admin/types";

export default function BuildingMFHistoryScreen({ navigation }: BuildingMFHistoryScreenProps) {
    const styles = useBuildingMFHistoryScreenStyles();

    const viewModel = useAdminMFViewModel();
    const [mfNotiDate, setMfNotiData] = useState<number | null>(null);
    const [filteredHistory, setFilteredHistory] = useState<BuildingMFHistory[]>([]);
    const filters = useMemo<Filter<BuildingMFHistory>[]>(() => {
        let floors = viewModel.data.map((f) => Math.floor(f.roomNumber / 100).toString());

        // 중복 제거
        floors = floors
            .filter((f, i) => {
                return floors.indexOf(f) === i;
            })
            .sort();

        const floorFilterIndex = buildingManagementFeeFilter.findIndex((f) => f.name === "층");

        if (floorFilterIndex === -1) {
            Alert.alert("필터에서 예기치 않은 문제가 발생했습니다.");
            navigation.reset({ index: 0, routes: [{ name: "home" }] });
        }

        const _filter = [...buildingManagementFeeFilter];
        _filter[floorFilterIndex].conditions = floors;

        return _filter;
    }, viewModel.data);

    useEffect(() => {
        viewModel.getBuildingInfo().then((r) => {
            if (r) setMfNotiData(r.mfNotiDate);
        });
    }, [viewModel.user.adminInfomation?.selectedBuilding]);

    return (
        <NavigationView
            headerOptions={{
                title: "관리비 현황 보기",
                hideBuidingSelector: true,
                navComponent: Message,
                navComponentProps: {
                    onPress: () => {
                        navigation.navigate("mf_select_to_do_something", {
                            dowhat: "message-to",
                            fees: JSON.stringify(filteredHistory),
                        });
                    },
                },
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
                    data={viewModel.data}
                    onFilterData={(data: BuildingMFHistory[]) => {
                        const _filteredHistory = data.sort((a, b) => {
                            if (a.roomNumber > b.roomNumber) {
                                return 1;
                            } else if (a.roomNumber < b.roomNumber) {
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
                                filteredHistory.filter((v) => v.totalUnpaidFee > 0).length === 0 &&
                                    styles.depositCheckBtnDisabled,
                            ]}
                            activeOpacity={0.6}
                            disabled={filteredHistory.filter((v) => v.totalUnpaidFee > 0).length === 0}
                            onPress={() => {
                                navigation.navigate("mf_select_to_do_something", {
                                    dowhat: "confirm-deposit",
                                    fees: JSON.stringify(filteredHistory),
                                });
                            }}>
                            <Text
                                style={[
                                    styles.depositCheckTxt,
                                    filteredHistory.filter((v) => v.totalUnpaidFee > 0).length === 0 &&
                                        styles.depositCheckTxtDisabled,
                                ]}
                                adjustsFontSizeToFit
                                numberOfLines={1}>
                                입금 확인하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        {mfNotiDate !== null &&
                            filteredHistory.map((element, index, elements) => (
                                <MFHistoryCardView
                                    key={index}
                                    index={index}
                                    totalCardCount={elements.length}
                                    mfNotiDate={mfNotiDate}
                                    {...element}
                                />
                            ))}
                    </ScrollView>
                </View>
            </View>
        </NavigationView>
    );
}
