import { ScrollView } from "react-native";
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
