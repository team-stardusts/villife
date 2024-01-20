import { BuildingMFHistory } from "../../viewmodel/admin/types";

export type MFHistoryCardViewProps = BuildingMFHistory & {
    index: number;
    totalCardCount: number;
    mfNotiDate: number;
    checkmode?: {
        checkAll: boolean | null;
        disabled: boolean;
        onCheck(check: boolean): void;
    };
};
