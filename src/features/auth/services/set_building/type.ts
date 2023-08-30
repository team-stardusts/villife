import {
    VerifyBuildingAddressParams,
    VerifyBuildingAddressResult,
} from "../../../../libs/rest_apis/villife/approval/types";
import { Building } from "../../../../libs/rest_apis/villife/building/types";

export interface IValidateResidenceService {
    ValidateUserResidenceForTest(params: Building.UserResidenceValidation.Params): Promise<string>;
    VerifyBuildingAddress(params: VerifyBuildingAddressParams): Promise<VerifyBuildingAddressResult>;
    RequestValidationOfUserRegidence(params: Building.UserResidenceValidation.Params): Promise<string>;
}

export type BuildingInfo = VerifyBuildingAddressResult;
