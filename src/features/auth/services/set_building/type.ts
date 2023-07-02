import {
    VerifyBuildingAddressParams,
    VerifyBuildingAddressResult,
} from "../../../../libs/rest_apis/villife/approval/types";
import { UserResidenceValidationParams } from "../../../../libs/rest_apis/villife/building/types";

export interface IValidateResidenceService {
    ValidateUserResidenceForTest(params: UserResidenceValidationParams): Promise<string>;
    VerifyBuildingAddress(params: VerifyBuildingAddressParams): Promise<VerifyBuildingAddressResult>;
    RequestValidationOfUserRegidence(params: UserResidenceValidationParams): Promise<string>;
}

export type BuildingInfo = VerifyBuildingAddressResult;
