import { PaymentBill } from "../../../../../../viewmodel/renter/types";
import useManagementFeeBoxStyles from "./styles";

export type ManagementFeeBoxProps = {
    bill: PaymentBill | null;
    billCreatedAt?: Date;
    customStyles?: ReturnType<typeof useManagementFeeBoxStyles>;
};
