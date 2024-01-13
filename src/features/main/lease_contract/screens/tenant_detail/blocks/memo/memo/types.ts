import { Villife } from "@team-stardusts/villife-client";

export type ContractMemoProps = Villife.Contract.Memo & {
    contractId: number;
    isEditMode: boolean;
    setIsEditMode: React.Dispatch<React.SetStateAction<ContractMemoProps["isEditMode"]>>;
};
