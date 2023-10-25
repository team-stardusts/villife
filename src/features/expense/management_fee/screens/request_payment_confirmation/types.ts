import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import type useRequestPaymentConfirmationStyles from "./styles";

type RequestPaymentConfirmationScreenProps = NativeStackScreenProps<
    VillifeStackParamList,
    "request_payment_confirmation"
>;

export default RequestPaymentConfirmationScreenProps;

export type AccountInfoProps = {
    styles: ReturnType<typeof useRequestPaymentConfirmationStyles>;
    rowKey: string;
    rowValue: string | undefined;
    copyable?: boolean;
};
