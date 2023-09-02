import { useEffect, useState } from "react";
import BuildingManagementServiceProvider from "../../../../services/provider";
import useUserInformation from "../../../../../../common/hooks/service/user_info";
import { BuildingRoomInfo } from "../../../../services/provider/types";

export default function useBuildngManagementFilterViewModel(): BuildingRoomInfo[] {
    const [tenants, setTenants] = useState<BuildingRoomInfo[] | null>(null);
    const user = useUserInformation();
    const service = new BuildingManagementServiceProvider();

    useEffect(() => {
        if (!user?.adminInfomation?.selectedBuilding) return;

        service.getRoomInfos(user.adminInfomation.selectedBuilding.id).then((result) => {
            let _tenant = null;
            if (result !== null) {
                _tenant = result.sort((a, b) => {
                    if (a.roomNumber > b.roomNumber) return 1;
                    if (a.roomNumber === b.roomNumber) return 0;
                    return -1;
                });
            }
            setTenants(_tenant);
        });
    }, [user?.adminInfomation?.selectedBuilding]);

    return tenants ?? [];
}
