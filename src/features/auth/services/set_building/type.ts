import {
    VerifyBuildingAddressParams,
    VerifyBuildingAddressResult,
    VerifyRoomParams,
} from "../../../../libs/rest_apis/villife/approval/types";
import { Building } from "../../../../libs/rest_apis/villife/building/types";
import { CheckUserIsWaitingForApprovalResult } from "../../../../libs/rest_apis/villife/approval/types";

export interface IValidateResidenceService {
    VerifyBuildingAddress(params: VerifyBuildingAddressParams): Promise<VerifyBuildingAddressResult>;
    RequestValidationOfUserRegidence(
        params: Building.UserResidenceValidation.Params
    ): Promise<Building.UserResidenceValidation.Returns>;
    VerifyRoom(params: VerifyRoomParams): Promise<string>;
    CheckUserIsWaitingForRegidenceApproval(): Promise<CheckUserIsWaitingForApprovalResult>;
}

export type BuildingInfo = VerifyBuildingAddressResult;
