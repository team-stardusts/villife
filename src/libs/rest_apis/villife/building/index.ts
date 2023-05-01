import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeBuildingManager, { UserResidenceValidationParams } from "./types";

class VillifeBuildingManager extends AVillifeServerModule implements IVillifeBuildingManager {
    public async ValidateUserResidenceForTest(params: UserResidenceValidationParams): Response<string> {
        let route: string = this.routes.testUserResidenceValidation;

        return await this.requestAuthable<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeBuildingManager;
