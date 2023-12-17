import VillifeApprovalClient from "./clients/approval";
import VillifeContractClient from "./clients/contract";
import VillifeParkingClient from "./clients/parking";
import { VILLIFE_AUTHORITY } from "./data/authority";
import Villife from "./types";

class VillifeClient implements Villife.IntegratedInstance {
    constructor(private baseURL: string, private session: any /* Villife.Utility.SessionStorage */) {}

    get approval() {
        return new VillifeApprovalClient(this.baseURL, this.session);
    }

    get auth() {
        return; // new VillifeAuthClient(baseURL, session);
    }

    get contract() {
        return new VillifeContractClient(this.baseURL, this.session);
    }

    get parking() {
        return new VillifeParkingClient(this.baseURL, this.session);
    }
}

export default VillifeClient;
export { VILLIFE_AUTHORITY };
