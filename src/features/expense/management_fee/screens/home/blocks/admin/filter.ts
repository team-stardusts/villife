import { ManagementFee } from "../../../../../../../libs/rest_apis/villife/expense/types";

const buildingManagementFeeFilter = [
    {
        name: "층",
        conditions: ["1", "2", "3"],
        postfix: "층",
        enableSelectAll: true,
        filter: (datum: ManagementFee.ManagementFee, selectedConditions: string[]) => {
            return true;
            //return selectedConditions.find((condition) => condition === datum.year.toString()) ? true : false;
        },
    },
    {
        name: "계약",
        conditions: ["미등록", "전세", "월세"],
        enableSelectAll: true,
        filter: (datum: ManagementFee.ManagementFee, selectedConditions: string[]) => {
            return true;
        },
    },
    {
        name: "상태",
        conditions: ["가입", "미가입", "공실"],
        enableSelectAll: true,
        filter: (datum: ManagementFee.ManagementFee, selectedConditions: string[]) => {
            return true;
        },
    },
    {
        name: "만료",
        conditions: ["만료", "만료 임박"],
        enableSelectAll: true,
        filter: (datum: ManagementFee.ManagementFee, selectedConditions: string[]) => {
            return true;
        },
    },
];

export default buildingManagementFeeFilter;
