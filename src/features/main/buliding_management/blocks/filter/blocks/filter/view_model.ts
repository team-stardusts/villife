import { useEffect, useState } from "react";
import { BuildingTenant } from "../../../../services/types";
import BuildingManagementServiceProvider from "../../../../services/provider";
import useUserInformation from "../../../../../../common/hooks/service/user_info";

export default function useBuildngManagementFilterViewModel(): BuildingTenant[] {
    const [tenants, setTenants] = useState<BuildingTenant[] | null>(null);
    const user = useUserInformation();
    const service = new BuildingManagementServiceProvider();

    useEffect(() => {
        if (!user?.adminInfomation?.selectedBuilding) return;
        service.getTentants(user.adminInfomation.selectedBuilding.id).then(setTenants);
        //service.getTentants(0).then(setTenants);
    }, [user?.adminInfomation?.selectedBuilding]);

    return tenants ?? [];
}
