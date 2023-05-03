import {
    VerifyBuildingAddressParams,
    VerifyBuildingAddressResult,
} from "../../../../libs/rest_apis/villife/approval/types";
import { UserResidenceValidationParams } from "../../../../libs/rest_apis/villife/building/types";

export interface IValidateResidenceService {
    ValidateUserResidenceForTest(params: UserResidenceValidationParams): Promise<string>;
    VerifyBuildingAddress(params: VerifyBuildingAddressParams): Promise<VerifyBuildingAddressResult>;
}

export type BuildingInfo = VerifyBuildingAddressResult;
