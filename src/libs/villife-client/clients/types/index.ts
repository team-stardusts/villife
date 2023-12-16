import VillifeContract from "./contract";
import VillifeUtility from "./utility";
import VillifeParking from "./parking";

interface VillifeClientInstance {
    contract: VillifeContract.Client;
    parking: VillifeParking.Client;
}

export type {
    VillifeContract as Contract,
    VillifeClientInstance as IntegratedInstance,
    VillifeParking as Parking,
    VillifeUtility as Utility,
};
