import Villife from "../../../../../libs/villife-client/types";
import { Filter } from "../../../../common/blocks/top_filter/types";
import { ArrayElement } from "../../../../common/global_interface";

const leaseFilter: Filter<Villife.Contract.Room>[] = [
    {
        name: "층",
        conditions: [],
        postfix: "층",
        enableSelectAll: true,
        filter: (datum, selectedConditions) => {
            if (selectedConditions.length > 0 && selectedConditions[0] === "전체") return true;

            return selectedConditions.find((condition) => condition === datum.floor.toString()) ? true : false;
        },
    },
    {
        name: "계약",
        conditions: ["미등록", "전세", "월세"],
        enableSelectAll: true,
        filter: (datum, selectedConditions) => {
            // 전체 선택
            if (selectedConditions.length === 3) return true;

            let rentType: ArrayElement<["미등록", "전세", "월세"]>;

            switch (datum.contractInfo.rentType) {
                case "lump-sum-deposit":
                    rentType = "전세";
                    break;
                case "monthly-rent":
                    rentType = "월세";
                    break;
                default:
                    rentType = "미등록";
            }

            return selectedConditions.find((v) => v === rentType) ? true : false;
        },
    },
    {
        name: "상태",
        conditions: ["가입", "미가입", "공실"],
        enableSelectAll: true,
        filter: (datum, selectedConditions) => {
            // 전체 선택
            if (selectedConditions.length === 3) return true;

            let roomState: ArrayElement<["가입", "미가입", "공실"]>;

            switch (datum.roomState) {
                case "signed":
                    roomState = "가입";
                    break;
                case "unsigned":
                    roomState = "미가입";
                    break;
                default:
                    roomState = "공실";
            }

            return selectedConditions.find((v) => v === roomState) ? true : false;
        },
    },
    {
        name: "만료",
        conditions: ["정상", "만료", "만료 임박"],
        enableSelectAll: true,
        disableMultipleSelection: true,
        filter: (datum, selectedConditions) => {
            // 전체 선택
            if (selectedConditions.length === 2) return true;

            let contractState: ArrayElement<["정상", "만료", "만료 임박"]>;

            switch (datum.contractState) {
                case "ImminentExpiration":
                    contractState = "만료 임박";
                    break;
                case "expired":
                    contractState = "만료";
                    break;
                default:
                    contractState = "정상";
            }

            return selectedConditions.find((v) => v === contractState) ? true : false;
        },
    },
];

export default leaseFilter;
