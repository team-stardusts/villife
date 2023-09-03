import { useRecoilState } from "recoil";
import { buildingRoomsState } from "./states";
import { BuildingRoomInfo } from "./provider/types";
import BuildingManagementServiceProvider from "./provider";

export default function useBuildingRooms() {
    const [buildingRooms, setBuildingRooms] = useRecoilState<BuildingRoomInfo[]>(buildingRoomsState);
    const service = new BuildingManagementServiceProvider();

    class BuildingRooms {
        get rooms(): BuildingRoomInfo[] {
            return buildingRooms;
        }

        public async updateRooms(buildingID: number) {
            setBuildingRooms(await service.getRoomInfos(buildingID));
        }
    }

    return new BuildingRooms();
}
