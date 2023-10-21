import { ManagementFee } from "../../../../../../../libs/rest_apis/villife/expense/types";

export type MFHistoryCardViewProps = ManagementFee.BuildingRenterMFHistory & {
    index: number;
    totalCardCount: number;
};
