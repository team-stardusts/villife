import { PaymentBill } from "../../../../../../viewmodel/renter/types";
import useManagementFeePaymentConfirmBoxStyles from "./styles";

export type ManagementFeePaymentConfirmBoxProps = {
    bill: PaymentBill;
    billCreatedAt?: Date;
};

export type AccountInfoProps = {
    styles: ReturnType<typeof useManagementFeePaymentConfirmBoxStyles>;
    rowKey: string;
    rowValue: string | undefined;
    rowRealValue?: string | undefined;
    copyable?: boolean;
};
