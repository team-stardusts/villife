import VillifeContract from "./contract";
import VillifeUtility from "./utility";

interface VillifeClientInstance {
    contract: VillifeContract.Client;
}

export type { VillifeContract as Contract, VillifeUtility as Utility, VillifeClientInstance as IntegratedInstance };
