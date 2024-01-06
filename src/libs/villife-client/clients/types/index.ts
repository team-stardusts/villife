import VillifeAuth from "./auth";
import VillifeApproval from "./approval";
import VillifeComplaint from "./complaint";
import VillifeContract from "./contract";
import VillifeExpense from "./expense";
import VillfeMedia from "./media";
import VillifeMessaging from "./messaging";
import VillifeNotice from "./notice";
import VillifeParking from "./parking";
import VillifePayment from "./payment";
import VillifeUser from "./user";
import VillifeUtility from "./utility";

interface VillifeClientInstance {
    approval: VillifeApproval.Client;
    auth: VillifeAuth.Client;
    complaint: VillifeComplaint.Client;
    contract: VillifeContract.Client;
    expense: VillifeExpense.Client;
    media: VillfeMedia.Client;
    messaging: VillifeMessaging.Client;
    notice: VillifeNotice.Client;
    parking: VillifeParking.Client;
    payment: VillifePayment.Client;
    user: VillifeUser.Client;
}

export type {
    VillifeApproval as Approval,
    VillifeAuth as Auth,
    VillifeClientInstance as IntegratedInstance,
    VillifeComplaint as Complaint,
    VillifeContract as Contract,
    VillifeExpense as Expense,
    VillfeMedia as Media,
    VillifeMessaging as Messaging,
    VillifeNotice as Notice,
    VillifeParking as Parking,
    VillifePayment as Payment,
    VillifeUser as User,
    VillifeUtility as Utility,
};
