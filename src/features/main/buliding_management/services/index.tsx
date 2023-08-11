import StardustDateParser from "../../../../libs/date_parser";
import VillifeServer from "../../../../libs/rest_apis/villife";
import IVillifeBuildingManager, { Building } from "../../../../libs/rest_apis/villife/building/types";
import { BuildingTenant, IBuildingManagementService } from "./types";

class BuildingManagementService implements IBuildingManagementService {
    private readonly _api: IVillifeBuildingManager = VillifeServer.getBuildingManager();

    public async getTentants(buildingID: number): Promise<BuildingTenant[]> {
        const tenants = await this.getTentantsFromServer(buildingID);
        return tenants.map((tenant) => {
            return this.convertTenantDataForUse(tenant);
        });
    }

    private convertTenantDataForUse(tenant: Building.Tenant): BuildingTenant {
        const contract = tenant.contract
            ? {
                  rentType: tenant.contract.rent_type,
                  deposit: tenant.contract.deposit,
                  monthlyRent: tenant.contract.monthly_rent,
                  managementFee: tenant.contract.management_fee,
                  startDate: StardustDateParser.deserialize(tenant.contract.start_date),
                  expirationDate: StardustDateParser.deserialize(tenant.contract.expiration_date),
                  createdAt: StardustDateParser.deserialize(tenant.contract.created_at),
                  updatedAt: StardustDateParser.deserialize(tenant.contract.updated_at),
              }
            : undefined;

        return {
            floor: tenant.floor,
            roomNumber: tenant.room_number,
            roomState: tenant.room_state,
            contractStatus: tenant.contract_status,
            residentID: tenant.resident_id,
            residentName: tenant.resident_name,
            residentPhoneNumber: tenant.resident_phone_number,
            contract,
        };
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
