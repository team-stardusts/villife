import { SimpleBuildingInfo } from "../../../../../../../libs/rest_apis/villife/user_info/types";

export type AdminInformation = {
    selectedBuilding: SimpleBuildingInfo;
    managedBuildings: Array<SimpleBuildingInfo>;
};
