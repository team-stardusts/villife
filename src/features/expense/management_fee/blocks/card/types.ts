import { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";

export type MFHistoryCardViewProps = ManagementFee.BuildingRenterHistory & {
    index: number;
    totalCardCount: number;
    checkmode?: {
        checkAll: boolean | null;
        disabled: boolean;
        onCheck(check: boolean): void;
    };
};
