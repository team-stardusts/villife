import Villife from "../types";
import VillifeClientCommon from "../absc";

class VillifeContractClient extends VillifeClientCommon implements Villife.Contract.Client {
    public async getBuilding(buildingId: number): Promise<Villife.Contract.Building> {
        const route: string = this._routes.budilingAndContract.building;

        return await this.requestWithAuth({
            method: "post",
            url: route,
            data: {
                buildingId,
            },
        });
    }

    public async getRoomsInBuilding(buildingId: number): Promise<Villife.Contract.Room[]> {
        const route = this._routes.budilingAndContract.totalInfo;

        return await this.requestWithAuth({
            method: "get",
            url: route,
            params: {
                buildingId,
            },
        });
    }

    public async registerBuilding(
        params: Villife.Contract.BuildingRegisterForm
    ): Promise<Villife.Contract.BuildingBreifInfo> {
        const route: string = this._routes.budilingAndContract.building;

        return await this.requestWithAuth({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async createContract(params: Villife.Contract.CreateForm): Promise<string> {
        const route: string = this._routes.budilingAndContract.contract;

        return await this.requestWithAuth({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async updateContract(params: Villife.Contract.UpdateForm): Promise<string> {
        const route: string = this._routes.budilingAndContract.contract;

        return await this.requestWithAuth({
            method: "patch",
            url: route,
            data: params,
        });
    }

    public async deleteContract(contractId: number): Promise<string> {
        const route: string = this._routes.budilingAndContract.contract;

        return await this.requestWithAuth({
            method: "delete",
            url: route,
            params: {
                contractId,
            },
        });
    }

    public async getContract(): Promise<Villife.Contract.Contract> {
        let route: string = this._routes.budilingAndContract.contract;

        return await this.requestWithAuth({
            method: "get",
            url: route,
        });
    }

    public async sendNotification(params: Villife.Contract.NotiForm): Promise<string> {
        const route: string = this._routes.budilingAndContract.buildingNoti;

        return await this.requestWithAuth({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async createMemo(params: Villife.Contract.MemoCreationForm): Promise<string> {
        const route: string = this._routes.budilingAndContract.contractMemo;

        return await this.requestWithAuth({
            method: "post",
            url: route,
            data: params,
        });
    }

    public async updateMemo(params: Villife.Contract.MemoUpdateForm): Promise<string> {
        const route: string = this._routes.budilingAndContract.contractMemo;

        return await this.requestWithAuth({
            method: "patch",
            url: route,
            data: params,
        });
    }

    public async deleteMemo(params: Villife.Contract.MemoDeletionForm): Promise<string> {
        const route: string = this._routes.budilingAndContract.contractMemo;

        return await this.requestWithAuth({
            method: "delete",
            url: route,
            data: params,
        });
    }
}

export default VillifeContractClient;
