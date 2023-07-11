import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeBuildingManager, { UserResidenceValidationParams, VehicleResidenceValidationParams } from "./types";

class VillifeBuildingManager extends AVillifeServerModule implements IVillifeBuildingManager {
    public async ValidateUserResidenceForTest(params: UserResidenceValidationParams): Response<string> {
        let route: string = this.routes.test.testUserResidenceValidation;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    public async ValidateVehicleResidenceForTest(params: VehicleResidenceValidationParams): Response<string> {
        let route: string = this.routes.test.testVehicleResidenceValidation;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    public async RequestValidationOfUserRegidence(params: UserResidenceValidationParams): Response<string> {
        let route: string = this.routes.approval.residenceValidation;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeBuildingManager;
