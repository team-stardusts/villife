import Villife from "../types";
import VillifeClientCommon from "../absc";

class VillifeUserClient extends VillifeClientCommon implements Villife.User.Client {
    public async getUserInfo(): Promise<Villife.User.User> {
        return this.requestWithCredential({
            method: "get",
            url: this._routes.userInfo.getUserBasicInfo,
        });
    }

    public async getManagedBuildingByAdmin(): Promise<Villife.User.SimpleBuildingInfo[]> {
        return this.requestWithCredential({
            method: "get",
            url: this._routes.userInfo.getBuildingManagedByAdmin,
        });
    }
}

export default VillifeUserClient;
