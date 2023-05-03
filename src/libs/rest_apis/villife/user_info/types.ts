import { UserDataType } from "../../../storage/tables/user/types";
import { Response } from "../../types";

export interface IVillifeUserInfoRestClient {
    GetUserBasicInfo(): Response<UserDataType>;
}
