import { UserDataType } from "../../../storage/tables/user/types";
import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import { IVillifeUserInfoRestClient } from "./types";

class VillifeUserInfoRestClient extends AVillifeServerModule implements IVillifeUserInfoRestClient {
    async GetUserBasicInfo(): Response<UserDataType> {
        let route: string = this.routes.getUserBasicInfo;

        return await this.requestAuthable<any, UserDataType>({
            method: "get",
            url: route,
        });
    }
}

export default VillifeUserInfoRestClient;
