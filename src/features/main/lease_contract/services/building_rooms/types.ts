import { BuildingRoomInfo, IRoomContractAdministrable } from "./provider/types";

export interface IBuildingRooms extends IRoomContractAdministrable {
    buildingID: number;
    rooms: BuildingRoomInfo[];
    updateRooms(): Promise<void>;
}
