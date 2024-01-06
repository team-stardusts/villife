import VillifeAuth from "./auth";
import VillifeApproval from "./approval";
import VillifeContract from "./contract";
import VillifeExpense from "./expense";
import VillifeMessaging from "./messaging";
import VillifeParking from "./parking";
import VillifeUser from "./user";
import VillifeUtility from "./utility";

interface VillifeClientInstance {
    approval: VillifeApproval.Client;
    auth: VillifeAuth.Client;
    contract: VillifeContract.Client;
    expense: VillifeExpense.Client;
    messaging: VillifeMessaging.Client;
    parking: VillifeParking.Client;
    user: VillifeUser.Client;
}

export type {
    VillifeApproval as Approval,
    VillifeAuth as Auth,
    VillifeClientInstance as IntegratedInstance,
    VillifeContract as Contract,
    VillifeExpense as Expense,
    VillifeMessaging as Messaging,
    VillifeParking as Parking,
    VillifeUser as User,
    VillifeUtility as Utility,
};
