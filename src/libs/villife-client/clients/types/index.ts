import VillifeContract from "./contract";
import VillifeUtility from "./utility";
import VillifeParking from "./parking";
import VillifeApproval from "./approval";
import VillifeExpense from "./expense";
import VillifeMessaging from "./messaging";

interface VillifeClientInstance {
    approval: VillifeApproval.Client;
    contract: VillifeContract.Client;
    expense: VillifeExpense.Client;
    messaging: VillifeMessaging.Client;
    parking: VillifeParking.Client;
}

export type {
    VillifeApproval as Approval,
    VillifeClientInstance as IntegratedInstance,
    VillifeContract as Contract,
    VillifeExpense as Expense,
    VillifeMessaging as Messaging,
    VillifeParking as Parking,
    VillifeUtility as Utility,
};
