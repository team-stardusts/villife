import { ManagementFee } from "../../../../../../../libs/rest_apis/villife/expense/types";
import type useUserMFViewStyles from "./styles";

export type ManagementFeeBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["managementFee"];
    manangementFee: ManagementFee.ManagementFee | undefined;
};

export type ManagementFeeBillBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["bill"];
    manangementFee: ManagementFee.ManagementFee | undefined;
    unpaidFee: number;
};

export type ManagementFeeStatusScrollViewProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["managementFeeStatus"];
    manangementFee: ManagementFee.ManagementFee[] | undefined;
};
