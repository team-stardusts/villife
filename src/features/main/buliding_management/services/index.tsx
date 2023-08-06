import StardustDateParser from "../../../../libs/date_parser";
import VillifeServer from "../../../../libs/rest_apis/villife";
import IVillifeBuildingManager, { Building } from "../../../../libs/rest_apis/villife/building/types";
import { BuildingTenant, IBuildingManagementService } from "./types";

class BuildingManagementService implements IBuildingManagementService {
    private readonly _api: IVillifeBuildingManager = VillifeServer.getBuildingManager();

    public async getTentants(buildingID: number): Promise<BuildingTenant[]> {
        const tenants = await this.getTentantsFromServer(buildingID);
        return tenants.map((tenant) => {
            return {
                floor: Math.floor(tenant.room_number / 100),
                roomNumber: tenant.room_number,
                roomType: tenant.room_type,
                contractType: tenant.contract_type,
                contractStartedAt: StardustDateParser.deserialize(tenant.contract_started_at),
                contractEndedAt: StardustDateParser.deserialize(tenant.contract_ended_at),
            };
        });
    }

    private async getTentantsFromServer(buildingID: number): Promise<Building.Tenant[]> {
        const result = await this._api.getTenantsTest({ buildingID });

        if (!result.isSuccessful || result.data?.data === undefined) {
            throw new Error("[BuildingManagementService] There was a problem getting a list of building residents.");
        }

        return result.data.data;
    }
}

export default BuildingManagementService;
