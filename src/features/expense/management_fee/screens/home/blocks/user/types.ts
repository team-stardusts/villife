import { PaymentBill, UserManagementFee } from "../../../../viewmodel/renter/types";
import type useUserMFViewStyles from "./styles";

export type ManagementFeeBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["managementFee"];
    bill: PaymentBill | null;
};

export type ManagementFeeBillBoxProps = PaymentBill & {
    styles: ReturnType<typeof useUserMFViewStyles>["bill"];
};

export type ManagementFeeStatusScrollViewProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["managementFeeStatus"];
    mfs: UserManagementFee[];
};

export type ManagementFeeHistoryBoxProps = {
    styles: ReturnType<typeof useUserMFViewStyles>["history"];
};
