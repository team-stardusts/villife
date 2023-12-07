import Villife from "../types";
import VillifeClientCommon from "../absc";

class VillifeContractClient extends VillifeClientCommon implements Villife.Contract.Client {
    public async getRoomsInBuilding(buildingId: number): Villife.Utility.AsyncResponse<Villife.Contract.Room[]> {
        const route = this._routes.budilingAndContract.totalInfo;

        return await this.requestWithAuth({
            method: "get",
            url: route,
            params: {
                buildingId: buildingId,
            },
        });
    }
}

export default VillifeContractClient;
