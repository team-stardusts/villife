import { Building } from "../../../../../../../../../libs/rest_apis/villife/building/types";
import { ArrayElement } from "../../../../../../../../common/global_interface";
import useMFDataSetterStyles from "../../styles";

export type BankAccountSetterProps = {
    styles: ReturnType<typeof useMFDataSetterStyles>;
    onEnterBankAccounts(accounts: BankAccountType[]): void;
};

export type BankAccountType = ArrayElement<Building.RegisterBuildng.Params["account_regi_req_forms"]>;
