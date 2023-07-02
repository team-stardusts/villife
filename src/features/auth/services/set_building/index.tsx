import React from "react";
import { IValidateResidenceService } from "./type";
import IVillifeBuildingManager, {
    UserResidenceValidationParams,
} from "../../../../libs/rest_apis/villife/building/types";
import VillifeServer from "../../../../libs/rest_apis/villife";
import IVillifeApprovalManager, {
    VerifyBuildingAddressParams,
} from "../../../../libs/rest_apis/villife/approval/types";

export default function useValidateResidenceService(): IValidateResidenceService {
    return new ValidateResidenceService();
}

class ValidateResidenceService implements IValidateResidenceService {
    private buildingRestClient: IVillifeBuildingManager = VillifeServer.getBuildingManager();
    private approvalRestClient: IVillifeApprovalManager = VillifeServer.getApprovalManager();

    async ValidateUserResidenceForTest(params: UserResidenceValidationParams) {
        const result = await this.buildingRestClient.ValidateUserResidenceForTest(params);

        if (!result.isSuccessful) {
            console.log("API Error Log:", result.data?.status);
            throw new Error("validation of user residence has failed");
        }
        if (!result.data?.data) throw new Error("cannot get data from api result");
        return result.data.data;
    }

    async VerifyBuildingAddress(params: VerifyBuildingAddressParams) {
        const result = await this.approvalRestClient.verifyBuildingAddress(params);

        if (!result.isSuccessful) {
            console.log("API Error Log:", result.data?.status);
            throw new Error("verification has failed");
        }
        if (!result.data?.data) throw new Error("cannot get data from api result");
        return result.data.data;
    }
    async RequestValidationOfUserRegidence(params: UserResidenceValidationParams) {
        const result = await this.buildingRestClient.RequestValidationOfUserRegidence(params);

        if (!result.isSuccessful) {
            console.log("API Error Log:", result.data?.status);
            throw new Error("validation of user residence has failed");
        }
        if (!result.data?.data) throw new Error("cannot get data from api result");
        return result.data.data;
    }
}
