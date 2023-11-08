import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";

type ManagementFeeCurrentMonthDetailScreenProps = NativeStackScreenProps<
    VillifeStackParamList,
    "management_fee_current_month_detail"
>;

export default ManagementFeeCurrentMonthDetailScreenProps;

export type PaidDateRange = {
    [key: string]: number[];
};
