import StardustDateParser from "../../../../../../libs/date_parser";
import { Responsable } from "../../../../../../libs/rest_apis/types";
import VillifeServer from "../../../../../../libs/rest_apis/villife";
import IVillifeApprovalManager from "../../../../../../libs/rest_apis/villife/approval/types";
import IVillifeBuildingManager, { Building } from "../../../../../../libs/rest_apis/villife/building/types";
import AServiceProvider from "../../../../../common/hooks/service/provider/absc";
import {
    BuildingRoomInfo,
    IBuildingManagementServiceProvider,
    ModifyContract,
    RegisterBuilding,
    RegisterContract,
    RequestNotification,
    VerifyBuildingAddress,
} from "./types";

class BuildingManagementServiceProvider extends AServiceProvider implements IBuildingManagementServiceProvider {
    protected readonly errorTag = "BUILDING_MANAGEMENT_SERVICE";
    private readonly _buildingApi: IVillifeBuildingManager = VillifeServer.getBuildingManager();
    private readonly _approvalApi: IVillifeApprovalManager = VillifeServer.getApprovalManager();

    public async getRoomInfos(buildingID: number): Promise<BuildingRoomInfo[]> {
        const tenants = await this.getRoomInfosFromServer(buildingID);

        return tenants.map((tenant) => {
            return this.convertRoomInfoForUse(tenant);
        });
    }

    public async registerBuilding(params: RegisterBuilding.Params): Promise<RegisterBuilding.Returns> {
        const basementRoomInfo = params.basementInfo || 0;

        const result = await this._buildingApi.registerBuildng({
            account_regi_req_forms: params.accountRegiReqForms,
            basement_info: basementRoomInfo,
            building_name: params.buildingName,
            mf_due_date: params.mfDueDate,
            mf_noti_date: params.mfNotiDate,
            owner_name: params.ownerName,
            road_addr: params.roadAddress,
            room_info: params.roomsInfo,
        });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "Failed to verify the address.");

            return null;
        }

        return {
            buildingID: result.data.data.building_id,
            roadAddress: result.data.data.road_addr,
        };
    }

    public async registerContract(params: RegisterContract.Params): Promise<boolean> {
        const result = await this._buildingApi.registerContract({
            auto_mf_billing: params.autoMFBilling,
            contractor_name: params.contractorName,
            delinquency_rate: params.delinquencyRate,
            deposit: params.deposit,
            expiration_date: StardustDateParser.serialize(params.expirationDate),
            management_fee: params.managementFee,
            monthly_rent: params.monthlyRent,
            rent_type: params.rentType,
            room_id: params.roomId,
            start_date: StardustDateParser.serialize(params.startDate),
        });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "Failed to register the contract.");

            return false;
        }

        return true;
    }

    public async deleteContract(contractID: number): Promise<boolean> {
        const result = await this._buildingApi.deleteContract({ contract_id: contractID });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "Failed to delete the contract.");

            return false;
        }

        return true;
    }

    public async modifyContract(params: ModifyContract.Params): Promise<boolean> {
        const result = await this._buildingApi.modifyContract({
            contract_id: params.contractID,
            auto_mf_billing: params.autoMFBilling,
            contractor_name: params.contractorName,
            delinquency_rate: params.delinquencyRate,
            deposit: params.deposit,
            expiration_date: StardustDateParser.serialize(params.expirationDate),
            management_fee: params.managementFee,
            monthly_rent: params.monthlyRent,
            rent_type: params.rentType,
            room_id: params.roomId,
            start_date: StardustDateParser.serialize(params.startDate),
        });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "Failed to modify the contract.");

            return false;
        }

        return true;
    }

    public async requestNotification(params: RequestNotification.Params): Promise<boolean> {
        const result = await this._buildingApi.requestNotification({
            contract_id: params.contractID,
            content: params.content,
            title: params.title,
        });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "Failed to request notification.");

            return false;
        }

        return true;
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

    private convertRoomInfoForUse(tenant: Building.RoomInfo): BuildingRoomInfo {
        const contractInfo = {
            contractID: tenant.contract_info.contract_id,
            rentType: tenant.contract_info.rent_type,
            deposit: tenant.contract_info.deposit,
            monthlyRent: tenant.contract_info.monthly_rent,
            managementFee: tenant.contract_info.management_fee,
            startDate: StardustDateParser.deserialize(tenant.contract_info.start_date),
            expirationDate: StardustDateParser.deserialize(tenant.contract_info.expiration_date),
            //createdAt: StardustDateParser.deserialize(tenant.contract_info.created_at),
            //updatedAt: StardustDateParser.deserialize(tenant.contract_info.updated_at),
        };

        return {
            contractInfo: contractInfo,
            contractState: tenant.contract_state,
            floor: tenant.floor,
            residentName: tenant.resident_name,
            residentPhoneNumber: tenant.resident_phone_number,
            roomNumber: tenant.room_number,
            roomID: tenant.room_id,
            roomState: tenant.room_state,
        };
    }

    private async getRoomInfosFromServer(buildingID: number): Promise<Building.RoomInfo[]> {
        const result = await this._buildingApi.getRoomInfosInBuilding({ building_id: buildingID });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data);

            throw new Error("[BUILDING_MANAGEMENT_SERVICE] There was a problem getting a list of building residents.");
        }

        return result.data.data;
    }
}

export default BuildingManagementServiceProvider;
