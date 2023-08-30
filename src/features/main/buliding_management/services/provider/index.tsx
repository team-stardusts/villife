import StardustDateParser from "../../../../../libs/date_parser";
import { Responsable } from "../../../../../libs/rest_apis/types";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import IVillifeApprovalManager from "../../../../../libs/rest_apis/villife/approval/types";
import IVillifeBuildingManager, { Building } from "../../../../../libs/rest_apis/villife/building/types";
import { BuildingTenant, IBuildingManagementServiceProvider, VerifyBuildingAddress } from "./types";

class BuildingManagementServiceProvider implements IBuildingManagementServiceProvider {
    private readonly _buildingApi: IVillifeBuildingManager = VillifeServer.getBuildingManager();
    private readonly _approvalApi: IVillifeApprovalManager = VillifeServer.getApprovalManager();

    public async getTentants(buildingID: number): Promise<BuildingTenant[]> {
        const tenants = await this.getTentantsFromServer(buildingID);
        return tenants.map((tenant) => {
            return this.convertTenantDataForUse(tenant);
        });
    }

    public async verifyBuildingAddress(params: VerifyBuildingAddress.Params): Promise<VerifyBuildingAddress.Returns> {
        const result = await this._approvalApi.verifyBuildingAddress({ address: params.roadAddress });

        if (!result.isSuccessful || result.data?.data === undefined) {
            // 등록되지 않은 건물인 경우 Status code 400을 리턴함
            // Status code가 400이 아닌 경우 예기치 않은 에러임
            if (result.data?.status !== 400) {
                this.printWhyFailed(result.data, "Failed to verify the address.");
            }

            return null;
        }

        return {
            id: result.data.data.building_id,
            name: result.data.data.building_name,
        };
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
        const result = await this._buildingApi.getTenantsTest({ buildingID });

        if (!result.isSuccessful || result.data?.data === undefined) {
            throw new Error("[BuildingManagementService] There was a problem getting a list of building residents.");
        }

        return result.data.data;
    }

    private printWhyFailed(response: Responsable<any>["data"], message?: string) {
        console.error(
            "[BUILDING_MANAGEMENT_SERVICE]",
            response?.status,
            message && message,
            `\n\tReason: ${response?.data}`
        );
    }
}

export default BuildingManagementServiceProvider;
