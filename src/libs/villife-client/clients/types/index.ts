import VillifeContract from "./contract";
import VillifeUtility from "./utility";
import VillifeParking from "./parking";
import VillifeApproval from "./approval";
import VillifeExpense from "./expense";

interface VillifeClientInstance {
    approval: VillifeApproval.Client;
    contract: VillifeContract.Client;
    expense: VillifeExpense.Client;
    parking: VillifeParking.Client;
}

export type {
    VillifeApproval as Approval,
    VillifeContract as Contract,
    VillifeExpense as Expense,
    VillifeClientInstance as IntegratedInstance,
    VillifeParking as Parking,
    VillifeUtility as Utility,
};
