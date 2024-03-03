import { Villife } from "@team-stardusts/villife-client";
import { ViewModel } from "../../../../model/types";
import useRoomViewModel from "../../../../../main/lease_contract/viewmodel/room";

export type BuildingInfoViewProps = {
    isAdmin: boolean | undefined;
    viewModel: ReturnType<typeof useRoomViewModel>;
    buildingInfo: Villife.Contract.Building;
    rooms: Array<number | null>;
};
