import { BankAccountType } from "../../types";

export type BankAccountSetModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onEnterBankAccountInfo(account: BankAccountType): void;
};
