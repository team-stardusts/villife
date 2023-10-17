import { ScrollView, View } from "react-native";
import ScreenTopFilter from "../../../../../../common/blocks/top_filter";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { AdminMFViewProps } from "./types";
import { AdminPaymentManagerBase } from "../../../../services/payment/types";
import useManagementFeeManager from "../../../../services/payment";
import { useEffect } from "react";
import buildingManagementFeeFilter from "./filter";

export default function AdminMFView(props: AdminMFViewProps) {
    const { deviceUI, theme } = useStyler();
    const manager: AdminPaymentManagerBase = useManagementFeeManager();

    useEffect(() => {}, []);

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
                onFilterData={() => {}}
                filters={buildingManagementFeeFilter}
            />
        </ScrollView>
    );
}

type testt = {
    name: string;
    floor: number;
    state: string;
};

/* 

1. 베이스 데이터
2. 필터 이름
3. 전체 선택 여부
4. 필터

<BaseFilter data={foos} onChangeData={}>
    <Filter 
        name="층"
        filter=["1", "2", "3"]
        postFix="층"
        enableSelectAll
    />
</BaseFilter>

 */
