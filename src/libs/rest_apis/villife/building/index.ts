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

    public async registerBuildng(params: Building.RegisterBuildng.Params): Response<Building.RegisterBuildng.Returns> {
        let route: string = this.routes.budilingAndContract.building;

        return await this.requestAuthable<Building.RegisterBuildng.Params, Building.RegisterBuildng.Returns>({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async validateUserResidenceForTest(params: Building.UserResidenceValidation.Params): Response<string> {
        let route: string = this.routes.test.testUserResidenceValidation;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
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

    public async requestValidationOfUserRegidence(params: Building.UserResidenceValidation.Params): Response<string> {
        let route: string = this.routes.approval.residenceValidation;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeBuildingManager;
