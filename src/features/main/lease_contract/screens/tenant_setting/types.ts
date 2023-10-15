import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { VillifeStackParamList } from "../../../../common/router/types";
import type useTenantSettingScreenStyles from "./styles";
import type { Dates } from "../../../../common/blocks/modal/calendar/types";
import type { Building } from "../../../../../libs/rest_apis/villife/building/types";

type TenantSettingScreenProps = NativeStackScreenProps<VillifeStackParamList, "tenant_setting">;

export default TenantSettingScreenProps;

export type ContractProps = InfoRowDefaultProps<Building.RentType | null>;
export type MoneyProps = InfoRowDefaultProps<number> & {
    title: string;
};
export type ContractRange = InfoRowDefaultProps<Dates>;

export type InfoRowDefaultProps<T> = {
    styles: ReturnType<typeof useTenantSettingScreenStyles>;
    onChangeInfo(data: T): void;
};

export type MoneyTypes = {
    deposit: MoneyType;
    monthlyRent: MoneyType;
    managementFee: MoneyType;
};

type MoneyType = {
    text: string;
    value: number;
};
