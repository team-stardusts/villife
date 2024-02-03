import { BankAccountType } from "./blocks/bank/types";

export type MFDataSetterProps = {
    initialValue?: MFData | undefined;
    onChangeMFData(mfdata: MFData): void;
};

export type MFData = {
    dueDay: number | null;
    notiDay: number | null;
    bankAccounts: BankAccountType[];
};

export type SelectedMFDay = {
    notiDay: {
        name: "고지일";
        explanation: string;
        day: number | null;
    };
    dueDay: {
        name: "마감일";
        explanation: string;
        day: number | null;
    };
};
