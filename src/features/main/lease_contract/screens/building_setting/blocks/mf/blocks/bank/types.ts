import { Villife } from "@team-stardusts/villife-client";
import { ArrayElement } from "../../../../../../../../common/global_interface";
import useMFDataSetterStyles from "../../styles";

export type BankAccountSetterProps = {
    styles: ReturnType<typeof useMFDataSetterStyles>;
    initialValue?: BankAccountType[] | undefined;
    onEnterBankAccounts(accounts: BankAccountType[]): void;
};

export type BankAccountType = ArrayElement<Villife.Contract.BuildingRegisterForm["accountRegiReqForms"]>;
