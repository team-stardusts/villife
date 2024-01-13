import { Villife } from "@team-stardusts/villife-client";

export type AdminInformation = {
    selectedBuilding: Villife.User.SimpleBuildingInfo;
    managedBuildings: Villife.User.SimpleBuildingInfo[];
};
