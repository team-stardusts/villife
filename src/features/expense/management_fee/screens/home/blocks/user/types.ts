import { ManagementFee } from "../../../../../../../libs/rest_apis/villife/expense/types";
import type useUserMFViewStyles from "./styles";

export type ManagementFeeBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["managementFee"];
    feeRequired: number;
};

export type ManagementFeeBillBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["bill"];
    manangementFee: ManagementFee.ManagementFee | undefined;
    unpaidFee: number;
};

export type ManagementFeeHistoryBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["history"];
    manangementFees: ManagementFee.ManagementFee[];
};

export type ManagementFeeStatusScrollViewProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["managementFeeStatus"];
    manangementFees: ManagementFee.ManagementFee[];
    unpaidFee: number;
};
