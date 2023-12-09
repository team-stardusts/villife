import Villife from "../../../../../../../../libs/villife-client/types";

export type ContractMemoProps = Villife.Contract.Memo & {
    contractId: number;
    isEditMode: boolean;
    setIsEditMode: React.Dispatch<React.SetStateAction<ContractMemoProps["isEditMode"]>>;
};
