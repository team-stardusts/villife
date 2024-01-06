import Villife from "../../../../../../../libs/villife-client/types";

export type AdminInformation = {
    selectedBuilding: Villife.User.SimpleBuildingInfo;
    managedBuildings: Villife.User.SimpleBuildingInfo[];
};
