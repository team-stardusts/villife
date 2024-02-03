import { Villife } from "@team-stardusts/villife-client";

export type BuildingInfoViewProps = {
    isAdmin: boolean | undefined;
    buildingInfo: Villife.Contract.Building;
    rooms: Array<number | null>;
};
