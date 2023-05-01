import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import { VerifyBuildingAddressParams, VerifyBuildingAddressResult } from "./types";

class VillifeApprovalManager extends AVillifeServerModule {
    /**
     * @param verifyBuildingAddress
     * @warn API for checking whether a building is in our database or not.
     */
    public async verifyBuildingAddress(params: VerifyBuildingAddressParams): Response<VerifyBuildingAddressResult> {
        let route: string = this.routes.verifyBuilding;

        return await this.requestAuthable<any, VerifyBuildingAddressResult>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeApprovalManager;
