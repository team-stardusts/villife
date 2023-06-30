import { UserDataType } from "../../../storage/tables/user/types";
import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import { SimpleBuildingInfo, IVillifeUserInfoRestClient } from "./types";

class VillifeUserInfoRestClient extends AVillifeServerModule implements IVillifeUserInfoRestClient {
    async GetUserBasicInfo(): Response<UserDataType> {
        let route: string = this.routes.userInfo.getUserBasicInfo;

        return await this.requestAuthable<any, UserDataType>({
            method: "get",
            url: route,
        });
    }

    async getBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>> {
        let route: string = this.routes.userInfo.getBuildingManagedByAdmin;

        return await this.requestAuthable<any, Array<SimpleBuildingInfo>>({
            method: "get",
            url: route,
        });
    }
}

export default VillifeUserInfoRestClient;
