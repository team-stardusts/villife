import React from "react";
import { IValidateResidenceService } from "./type";
import IVillifeBuildingManager, { Building } from "../../../../libs/rest_apis/villife/building/types";
import VillifeServer from "../../../../libs/rest_apis/villife";
import IVillifeApprovalManager, {
    VerifyBuildingAddressParams,
    VerifyRoomParams,
} from "../../../../libs/rest_apis/villife/approval/types";

export default function useValidateResidenceService(): IValidateResidenceService {
    return new ValidateResidenceService();
}

class ValidateResidenceService implements IValidateResidenceService {
    private buildingRestClient: IVillifeBuildingManager = VillifeServer.getBuildingManager();
    private approvalRestClient: IVillifeApprovalManager = VillifeServer.getApprovalManager();

    async ValidateUserResidenceForTest(params: Building.UserResidenceValidation.Params) {
        const result = await this.buildingRestClient.validateUserResidenceForTest(params);

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
    async RequestValidationOfUserRegidence(params: Building.UserResidenceValidation.Params) {
        const result = await this.buildingRestClient.requestValidationOfUserRegidence(params);

        if (!result.isSuccessful) {
            console.log("API Error Log:", result.data?.status);
            throw new Error("validation of user residence has failed");
        }
        if (!result.data?.data) throw new Error("cannot get data from api result");
        return result.data.data;
    }

    async VerifyRoom(params: VerifyRoomParams) {
        const result = await this.approvalRestClient.verifyRoom(params);
        if (!result.isSuccessful) {
            console.log("API Error Log:", result.data?.status);
            throw new Error("validation of user residence has failed");
        }
        if (!result.data?.data) throw new Error("cannot get data from api result");
        return result.data.data;
    }

    async CheckUserIsWaitingForRegidenceApproval() {
        const result = await this.approvalRestClient.checkUserIsWaitingForApproval(1, 1);
        if (!result.isSuccessful) {
            console.log("API Error Log:", result.data?.status);
            throw new Error("validation of user residence has failed");
        }
        if (!result.data?.data) throw new Error("cannot get data from api result");
        return result.data.data;
    }
}
