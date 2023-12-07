import VillifeUtility from "./utility";

namespace VillifeContract {
    export interface Client {
        getRoomsInBuilding(buildingId: number): VillifeUtility.AsyncResponse<Room[]>;
    }

    export type Building = {
        bankAccounts: BankAccount[];
        buildingId: number;
        buildingName: string;
        mfDueDate: number;
        mfNotiDate: number;
        ownerName: string;
        roadAddr: string;
    };

    export type BankAccount = {
        accountId: number;
        accountNumber: string;
        accountType: string;
        bankName: string;
        ownerName: string;
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
    };

    export type Memo = {
        content: string;
        memoId: number;
        memoType: string;
    };

    export type Room = {
        contractInfo: Contract;
        contractState: ContractStatus;
        floor: number;
        residentName: string;
        residentPhone_number: string;
        roomNumber: number;
        roomId: number;
        roomState: RoomState;
        //resident_id?: string;
    };

    // 만료 / 만료 임박 / 없음 / 정상
    export type ContractStatus = "expired" | "ImminentExpiration" | "absense" | "normal";
    export type RoomState = "empty" | "signed" | "unsigned";
    export type RentType = "" | "lump-sum-deposit" | "monthly-rent";
}

export default VillifeContract;
