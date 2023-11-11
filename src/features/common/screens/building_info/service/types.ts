import { Building } from "../../../../../libs/rest_apis/villife/building/types";

export interface BuildingInfoGettable {
    getBuildingInfo(buildingID: number): Promise<Building.BuildingInfo | null>;
    getBuildingRoomsInfo(buildingID: number): Promise<Array<number | null>>;
}

export interface BuildingInfoBase {
    isAdmin: boolean;
    address: string;
    bankAccounts: Building.BuildingBankAccountInfo[];
    mfDueDate: number;
    mfNotiDate: number;
    name: string;
    ownerName: string;
    rooms: Array<number | null>;
}

export type ExtendedBuildingInfo = Building.BuildingInfo & {
    rooms: Array<number | null>;
};
