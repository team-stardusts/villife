import StardustDateParser from "../../../../../libs/date_parser";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import { Filter } from "../../../../common/blocks/top_filter/types";

const buildingManagementFeeFilter: Filter<ManagementFee.BuildingRenterMFHistory>[] = [
    {
        name: "층",
        conditions: [],
        postfix: "층",
        enableSelectAll: true,
        filter: (datum: ManagementFee.BuildingRenterMFHistory, selectedConditions: string[]) => {
            return selectedConditions.find((condition) => condition === Math.floor(datum.room_number / 100).toString())
                ? true
                : false;
        },
    },
    {
        name: "고지 여부",
        conditions: ["미고지", "고지"],
        enableSelectAll: true,
        disableMultipleSelection: true,
        filter: (datum: ManagementFee.BuildingRenterMFHistory, selectedConditions: string[]) => {
            const today = StardustDateParser.changeGMT(new Date(), "kr");
            const thisYear = today.getFullYear();
            const thisMonth = today.getMonth() + 1;

            // 전체 선택
            if (selectedConditions.length === 2) return true;

            if (selectedConditions[0] === "고지") {
                return datum.lastest_noti_year === thisYear && datum.lastest_noti_month === thisMonth;
            } else {
                return datum.lastest_noti_year !== thisYear || datum.lastest_noti_month !== thisMonth;
            }
        },
    },
    {
        name: "미납",
        conditions: ["미납", "완납"],
        enableSelectAll: true,
        disableMultipleSelection: true,
        filter: (datum: ManagementFee.BuildingRenterMFHistory, selectedConditions: string[]) => {
            const today = StardustDateParser.changeGMT(new Date(), "kr");
            const thisYear = today.getFullYear();
            const thisMonth = today.getMonth() + 1;

            // 전체 선택
            if (selectedConditions.length === 2) return true;

            if (selectedConditions[0] === "완납") {
                //return datum.LastestPaidYear === thisYear && datum.LastestPaidMonth === thisMonth;
                return datum.total_unpaid_fee === 0;
            } else {
                //return datum.LastestPaidYear !== thisYear || datum.LastestPaidMonth !== thisMonth;
                return datum.total_unpaid_fee > 0;
            }
        },
    },
];

export default buildingManagementFeeFilter;
