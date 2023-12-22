import StardustDateParser from "../../../../../libs/date_parser";
import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import { Filter } from "../../../../common/blocks/top_filter/types";
import { BuildingMFHistory } from "../../viewmodel/admin/types";

const buildingManagementFeeFilter: Filter<BuildingMFHistory>[] = [
    {
        name: "층",
        conditions: [],
        postfix: "층",
        enableSelectAll: true,
        filter: (datum: BuildingMFHistory, selectedConditions: string[]) => {
            return selectedConditions.find((condition) => condition === Math.floor(datum.roomNumber / 100).toString())
                ? true
                : false;
        },
    },
    {
        name: "고지 여부",
        conditions: ["미고지", "고지"],
        enableSelectAll: true,
        disableMultipleSelection: true,
        filter: (datum: BuildingMFHistory, selectedConditions: string[]) => {
            const today = StardustDateParser.changeGMT(new Date(), "kr");
            const thisYear = today.getFullYear();
            const thisMonth = today.getMonth() + 1;

            // 전체 선택
            if (selectedConditions.length === 2) return true;

            if (selectedConditions[0] === "고지") {
                return datum.lastestNotiYear === thisYear && datum.lastestNotiMonth === thisMonth;
            } else {
                return datum.lastestNotiYear !== thisYear || datum.lastestNotiMonth !== thisMonth;
            }
        },
    },
    {
        name: "미납",
        conditions: ["미납", "완납"],
        enableSelectAll: true,
        disableMultipleSelection: true,
        filter: (datum: BuildingMFHistory, selectedConditions: string[]) => {
            const today = StardustDateParser.changeGMT(new Date(), "kr");
            const thisYear = today.getFullYear();
            const thisMonth = today.getMonth() + 1;

            // 전체 선택
            if (selectedConditions.length === 2) return true;

            if (selectedConditions[0] === "완납") {
                //return datum.LastestPaidYear === thisYear && datum.LastestPaidMonth === thisMonth;
                return datum.totalUnpaidFee === 0;
            } else {
                //return datum.LastestPaidYear !== thisYear || datum.LastestPaidMonth !== thisMonth;
                return datum.totalUnpaidFee > 0;
            }
        },
    },
];

export default buildingManagementFeeFilter;
