import { Building } from "../../../../../../../../libs/rest_apis/villife/building/types";

export type BankInfoBoxProps = {
    bankName: Building.BuildingBankAccountInfo["bank_name"];
    accountHolder: Building.BuildingBankAccountInfo["owner_name"];
    accountNumber: Building.BuildingBankAccountInfo["account_number"];
};
