import { atom } from "recoil";
import { BuildingRoomInfo } from "../provider/types";

export const buildingRoomsState = atom<BuildingRoomInfo[]>({
    key: "buildingRoomsState",
    default: [],
});
