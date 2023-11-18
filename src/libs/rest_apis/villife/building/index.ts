import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeBuildingManager, { Building } from "./types";

class VillifeBuildingManager extends AVillifeServerModule implements IVillifeBuildingManager {
    public async getRoomInfosInBuilding(
        params: Building.GetRoomInfosInBuilding.Params
    ): Response<Building.GetRoomInfosInBuilding.Returns> {
        let route = this.routes.budilingAndContract.totalInfo;

        return await this.requestAuthable<
            Building.GetRoomInfosInBuilding.Params,
            Building.GetRoomInfosInBuilding.Returns
        >({
            method: "get",
            url: route,
            params: params,
        });
        /* let route = "test";

        return await this.requestForTest<Building.GetRoomInfosInBuilding.Returns>(generateDummyRoomInfoData()); */
    }

    public async getBuildingInfo(params: Building.GetBuildngInfo.Params): Response<Building.BuildingInfo> {
        let route: string = this.routes.budilingAndContract.building;

        const _params: Building.GetBuildngInfo.ReqParams = {
            building_id: params.buildingID,
        };

        return await this.requestAuthable<Building.GetBuildngInfo.ReqParams, Building.GetBuildngInfo.Returns>({
            method: "get",
            url: route,
            params: _params,
        });
    }

    public async registerBuildng(params: Building.RegisterBuildng.Params): Response<Building.RegisterBuildng.Returns> {
        let route: string = this.routes.budilingAndContract.building;

        return await this.requestAuthable<Building.RegisterBuildng.Params, Building.RegisterBuildng.Returns>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async registerContract(
        params: Building.RegisterContract.Params
    ): Response<Building.RegisterContract.Returns> {
        let route: string = this.routes.budilingAndContract.contract;

        return await this.requestAuthable<Building.RegisterContract.Params, Building.RegisterContract.Returns>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async modifyContract(params: Building.ModifyContract.Params): Response<Building.ModifyContract.Returns> {
        let route: string = this.routes.budilingAndContract.contract;
        console.log(params);
        return await this.requestAuthable<Building.ModifyContract.Params, Building.ModifyContract.Returns>({
            method: "patch",
            url: route,
            data: params,
        });
    }

    public async deleteContract(params: Building.DeleteContract.Params): Response<Building.DeleteContract.Returns> {
        let route: string = this.routes.budilingAndContract.contract;

        return await this.requestAuthable<Building.DeleteContract.Params, Building.DeleteContract.Returns>({
            method: "delete",
            url: route,
            params: params,
        });
    }

    public async validateVehicleResidenceForTest(params: Building.VehicleResidenceValidation.Params): Response<string> {
        let route: string = this.routes.test.testVehicleResidenceValidation;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async requestValidationOfUserRegidence(
        params: Building.UserResidenceValidation.Params
    ): Response<Building.UserResidenceValidation.Returns> {
        let route: string = this.routes.approval.residenceValidation;

        return await this.requestAuthable<any, Building.UserResidenceValidation.Returns>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async requestNotification(
        params: Building.RequestNotification.Params
    ): Response<Building.RequestNotification.Returns> {
        let route: string = this.routes.budilingAndContract.buildingNoti;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    public async getContractInfoByRenter(): Response<Building.Contract> {
        let route: string = this.routes.budilingAndContract.contract;

        return await this.requestAuthable<any, Building.Contract>({
            method: "get",
            url: route,
        });
    }
}

export default VillifeBuildingManager;
