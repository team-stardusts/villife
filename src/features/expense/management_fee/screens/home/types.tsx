import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { VillifeStackParamList } from "../../../../common/router/types";
import type { ManagementFee } from "../../../../../libs/rest_apis/villife/expense/types";
import type useManagementFeeHomeScreenStyles from "./styles";

type ManagementFeeHomeScreenProps = NativeStackScreenProps<VillifeStackParamList, "management_fee">;

export default ManagementFeeHomeScreenProps;

export type ManagementFeeBoxProps = {
    styles: ReturnType<typeof useManagementFeeHomeScreenStyles>["managementFee"];
    manangementFee: ManagementFee.ManagementFee | undefined;
};

export type ManagementFeeBillBoxProps = {
    styles: ReturnType<typeof useManagementFeeHomeScreenStyles>["bill"];
    manangementFee: ManagementFee.ManagementFee | undefined;
    unpaidFee: number;
};

export type ManagementFeeStatusScrollViewProps = {
    styles: ReturnType<typeof useManagementFeeHomeScreenStyles>["managementFeeStatus"];
    manangementFees: ManagementFee.ManagementFee[] | undefined;
};
