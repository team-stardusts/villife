import { useRecoilState } from "recoil";
import useUserInformation from "../../../../common/hooks/service/user_info";
import AdminPaymentManager from "./manager/admin";
import UserPaymentManager from "./manager/user";
import { ManagementFeeManager } from "./types";
import { buildingMFHistory, userMFHistory } from "./state";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";

export default function useManagementFeeManager() {
    const [buildingH, setBuildingH] = useRecoilState(buildingMFHistory);
    const [userH, setUserH] = useRecoilState(userMFHistory);
    const user: UserInfo | null = useUserInformation();

    if (user?.isAdmin) {
        return new AdminPaymentManager(user, buildingH, setBuildingH);
    }

    return new UserPaymentManager(user, userH, setUserH);
}
