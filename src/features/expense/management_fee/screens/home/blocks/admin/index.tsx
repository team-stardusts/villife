import { Alert, ScrollView } from "react-native";
import ScreenTopFilter from "../../../../../../common/blocks/top_filter";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { AdminMFViewProps } from "./types";
import { AdminPaymentManagerBase, History } from "../../../../services/payment/types";
import useManagementFeeManager from "../../../../services/payment";
import { useCallback, useEffect, useState } from "react";
import buildingManagementFeeFilter from "./filter";
import { ManagementFee } from "../../../../../../../libs/rest_apis/villife/expense/types";
import { Filter } from "../../../../../../common/blocks/top_filter/types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../common/router/types";

export default function AdminMFView(props: AdminMFViewProps) {
    const { deviceUI, theme } = useStyler();
    const navigation = useNavigation<VillifeNavigation>();
    const manager: AdminPaymentManagerBase = useManagementFeeManager() as AdminPaymentManagerBase;
    const [filters, setFilters] =
        useState<Filter<ManagementFee.BuildingRenterMFHistory>[]>(buildingManagementFeeFilter);

    useEffect(() => {
        manager.updateHistory();
    }, [manager.selectedBuilding]);

    useEffect(() => {
        setFilterFloors();
    }, [manager.history]);

    const setFilterFloors = () => {
        const floors = manager.history.map((f) => Math.floor(f.RoomNumber / 100).toString()).sort();
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
        <ScrollView>
            <ScreenTopFilter
                style={{
                    backgroundColor: theme.color.series.grey.level1,
                    //borderTopColor: "",
                    borderBottomColor: theme.color.series.grey.level2,
                }}
                filterStyle={{
                    selectedBorderColor: theme.color.specified.black,
                    selectedBackgroundColor: theme.color.specified.white,
                    backgroundColor: theme.color.series.grey.level1,
                }}
                data={manager.history}
                onFilterData={console.log}
                filters={filters}
            />
        </ScrollView>
    );
}
