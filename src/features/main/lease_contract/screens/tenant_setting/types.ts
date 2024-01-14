import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { VillifeStackParamList } from "../../../../common/router/types";
import type useTenantSettingScreenStyles from "./styles";
import type { Dates } from "../../../../common/blocks/modal/calendar/types";
import { Villife } from "@team-stardusts/villife-client";

type TenantSettingScreenProps = NativeStackScreenProps<VillifeStackParamList, "tenant_setting">;

export default TenantSettingScreenProps;

export type ScreenTitle = {
    nav: string;
    main: string;
    sub: string;
};

export type TenantInfoInputProps = InfoRowDefaultProps<UserProfile> & {
    initialInfo?: {
        name: string;
        phoneNumber: string;
    };
};

export type ContractProps = InfoRowDefaultProps<Villife.Contract.RentType> & {
    initialRentType?: Villife.Contract.RentType;
};

export type MoneyProps = InfoRowDefaultProps<number> & {
    title: string;
    initialValue?: number;
    unit: string;
};

export type ContractRange = InfoRowDefaultProps<Dates> & {
    initialDate?: {
        startDate: Date;
        expirationDate: Date;
    };
};

export type PaymentMethodProps = InfoRowDefaultProps<Villife.Contract.PaymentMethodType> & {
    initialPaymentMethodType?: Villife.Contract.PaymentMethodType;
};

export type InfoRowDefaultProps<T> = {
    styles: ReturnType<typeof useTenantSettingScreenStyles>;
    onChangeInfo(data: T): void;
};

export type UserContract = {
    type: Villife.Contract.RentType | null;
    dates: Dates | null;
};

export type UserProfile = {
    name: string | null;
    phoneNumber: string | null;
};

export type MoneyType = {
    text: "보증금" | "관리비" | "월세" | "연체요율";
    value: number;
};
