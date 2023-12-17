import VillifeContract from "./contract";
import VillifeUtility from "./utility";
import VillifeParking from "./parking";
import VillifeApproval from "./approval";

interface VillifeClientInstance {
    approval: VillifeApproval.Client;
    contract: VillifeContract.Client;
    parking: VillifeParking.Client;
}

export type {
    VillifeApproval as Approval,
    VillifeContract as Contract,
    VillifeClientInstance as IntegratedInstance,
    VillifeParking as Parking,
    VillifeUtility as Utility,
};
