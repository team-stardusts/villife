import { ManagementFee } from "../../../../../../../libs/rest_apis/villife/expense/types";
import { PaymentBill } from "../../../../services/payment/types";
import type useUserMFViewStyles from "./styles";

export type ManagementFeeBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["managementFee"];
    feeToPay: PaymentBill["feeToPay"] | undefined;
};

export type ManagementFeeBillBoxProps = PaymentBill & {
    styles: ReturnType<typeof useUserMFViewStyles>["bill"];
};

export type ManagementFeeStatusScrollViewProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["managementFeeStatus"];
    manangementFees: ManagementFee.ManagementFee[];
    feeToPay: PaymentBill["feeToPay"] | undefined;
};

export type ManagementFeeHistoryBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["history"];
};
