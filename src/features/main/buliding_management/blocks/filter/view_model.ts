import { useEffect, useState } from "react";
import { BuildingTenant } from "../../services/types";
import BuildingManagementService from "../../services";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function useBuildngManagementFilterViewModel(): BuildingTenant[] {
    const [tenants, setTenants] = useState<BuildingTenant[] | null>(null);
    const user = useUserInformation();
    const service = new BuildingManagementService();

    useEffect(() => {
        if (!user?.adminInfomation?.selectedBuilding) return;

        service.getTentants(user.adminInfomation.selectedBuilding.id).then(setTenants);
    }, [user?.adminInfomation?.selectedBuilding]);

    return tenants ?? [];
}
