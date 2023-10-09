import useUserInformation from "../../../../common/hooks/service/user_info";
import useAdminManagementFeeManager from "./manager/admin";
import useUserManagementFeeManager from "./manager/user";
import { PaymentManagerBase } from "./types";

export default function useManagementFeeManager(): PaymentManagerBase {
    const user = useUserInformation();

    if (user?.isAdmin) {
        return useAdminManagementFeeManager();
    }

    return useUserManagementFeeManager();
}
