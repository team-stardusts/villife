import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { VillifeStackParamList } from "../../../../common/router/types";
import type { Payment } from "../../../../../libs/rest_apis/villife/payment/types";
import type usePaymentScreenStyles from "./styles";

type PaymentScreenProps = NativeStackScreenProps<VillifeStackParamList, "payment">;

export default PaymentScreenProps;

export type PaymentBoxProps = {
    styles: ReturnType<typeof usePaymentScreenStyles>["payment"];
    manangementFee: Payment.ManagementFee | undefined;
};

export type BillBoxProps = {
    styles: ReturnType<typeof usePaymentScreenStyles>["bill"];
    manangementFee: Payment.ManagementFee | undefined;
};

export type PaymentStatusScrollViewProps = {
    styles: ReturnType<typeof usePaymentScreenStyles>["paymentStatus"];
    manangementFees: Payment.ManagementFee[] | undefined;
};
