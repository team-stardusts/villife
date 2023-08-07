import { Response, ResponseForTest } from "../../types";
import AVillifeServerModule from "../absc";
import generateDummyTenantData from "./dummy";
import IVillifeBuildingManager, { Building } from "./types";

class VillifeBuildingManager extends AVillifeServerModule implements IVillifeBuildingManager {
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

    public async getTenantsTest(params: Building.GetTentants.Params): ResponseForTest<Building.GetTentants.Returns> {
        let route = "test";

        return await this.requestForTest<Building.GetTentants.Returns>(generateDummyTenantData());
    }
}

export default VillifeBuildingManager;
