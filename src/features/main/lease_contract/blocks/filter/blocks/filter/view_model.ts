import { useEffect, useState } from "react";
import useUserInformation from "../../../../../../common/hooks/service/user_info";
import { BuildingRoomInfo } from "../../../../services/building_rooms/provider/types";
import useBuildingRoomContractor from "../../../../services/building_rooms";

export default function useBuildngManagementFilterViewModel(): BuildingRoomInfo[] {
    const [tenants, setTenants] = useState<BuildingRoomInfo[] | null>(null);
    const user = useUserInformation();
    const contractor = useBuildingRoomContractor();

    useEffect(() => {
        if (!user?.adminInfomation?.selectedBuilding) return;

        contractor.updateRooms();
    }, [user?.adminInfomation?.selectedBuilding]);

    useEffect(() => {
        setTenants(
            contractor.rooms.slice().sort((a, b) => {
                if (a.roomNumber > b.roomNumber) return 1;
                if (a.roomNumber === b.roomNumber) return 0;
                return -1;
            })
        );
    }, [contractor.rooms]);

    return tenants ?? [];
}
