namespace VillifeContract {
    export interface Client {
        //requestToVerifyUserLiving()
        // Building
        getBuilding(buildingId: number): Promise<Building>;
        getRoomsInBuilding(buildingId: number): Promise<Room[]>;
        registerBuilding(params: BuildingRegisterForm): Promise<BuildingBreifInfo>;
        // Contract
        createContract(params: CreateForm): Promise<string>;
        getContract(): Promise<Contract>;
        updateContract(params: UpdateForm): Promise<string>;
        deleteContract(contractId: Contract["contractId"]): Promise<string>;
        sendNotification(params: NotiForm): Promise<string>;
        // Memo
        createMemo(params: MemoCreationForm): Promise<string>;
        updateMemo(params: MemoUpdateForm): Promise<string>;
        deleteMemo(params: MemoDeletionForm): Promise<string>;
    }

    export type BankAccount = {
        accountId: number;
        accountNumber: string;
        accountType: string;
        bankName: string;
        ownerName: string;
    };

    export type Building = {
        bankAccounts: BankAccount[];
        buildingId: number;
        buildingName: string;
        mfDueDate: number;
        mfNotiDate: number;
        ownerName: string;
        roadAddr: string;
    };

    export type BuildingBreifInfo = {
        buildingId: number;
        roadAddr: string;
    };

    export type BuildingRegisterForm = {
        accountRegiReqForms: Array<{
            accountNumber: string;
            accountType: string;
            bankName: string;
            ownerName: string;
        }>;
        basementInfo: number;
        buildingName: string;
        mfDueDate: number;
        mfNotiDate: number;
        ownerName: string;
        roadAddr: string;
        roomInfo: number[];
    };

    export type BuildingModifyForm = {
        buildingId: Building["buildingId"];
        buildingName: Building["buildingName"];
        deletedAccounts: number[];
        mfDueDate: Building["mfDueDate"];
        mfNotiDate: Building["mfNotiDate"];
        newAccounts: Array<{
            accountNumber: string;
            accountType: string;
            bankName: string;
            ownerName: string;
        }>;
        ownerName: Building["ownerName"];
    };

    export type Contract = {
        contractId: number;
        contractorName: string;
        delinquencyRate: number;
        deposit: number;
        expirationDate: number;
        managementFee: number;
        memo: Memo[];
        monthlyRent: number;
        phoneNumber: string;
        rentType: RentType;
        startDate: number;
        isPrePaidMr: boolean;
    };

    export type CreateForm = {
        autoMfBilling: boolean;
        contractorName: Contract["contractorName"];
        delinquencyRate: Contract["delinquencyRate"];
        deposit: Contract["deposit"];
        expirationDate: Contract["expirationDate"];
        managementFee: Contract["managementFee"];
        monthlyRent?: Contract["monthlyRent"];
        rentType: Contract["rentType"];
        roomId: Room["roomId"];
        startDate: Contract["startDate"];
        phoneNumber: Contract["phoneNumber"];
        isPrePaidMr: boolean;
    };

    export type UpdateForm = CreateForm & {
        contractId: Contract["contractId"];
    };

    export type NotiForm = {
        contractId: Contract["contractId"];
        content: string;
        title: string;
    };

    export type Memo = {
        content: string;
        memoId: number;
        memoType: string;
    };

    export type MemoCreationForm = {
        buildingId: Building["buildingId"];
        content: string;
        contractId: Contract["contractId"];
        memoType: string;
    };

    export type MemoDeletionForm = {
        buildingId: Building["buildingId"];
        memoId: number;
    };

    export type MemoUpdateForm = MemoDeletionForm & {
        content: string;
    };

    export type Room = {
        contractInfo: Contract;
        contractState: ContractStatus;
        floor: number;
        residentName: string;
        residentPhoneNumber: string;
        roomNumber: number;
        roomId: number;
        roomState: RoomState;
        //resident_id?: string;
    };

    // 만료 / 만료 임박 / 없음 / 정상
    export type ContractStatus = "expired" | "ImminentExpiration" | "absense" | "normal";
    export type RoomState = "empty" | "signed" | "unsigned";
    export type RentType = "" | "lump-sum-deposit" | "monthly-rent";
    export type PaymentMethodType = true | false;
}

export default VillifeContract;
