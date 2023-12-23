import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { PaymentBill } from "../../viewmodel/renter/types";

type ManagementFeeDetailScreenProps = NativeStackScreenProps<VillifeStackParamList, "management_fee_detail">;

export default ManagementFeeDetailScreenProps;

export type PaidDateRange = {
    [key: string]: number[];
};

export type SelectedDate = {
    year: number;
    month: number;
};

export type PaymentBillByMonth = PaymentBill & {
    isPaid: boolean;
    totalPaidFee: number;
    paidMonthlyCharge: number;
    paidLateFee: number;
};
