import { useRecoilState } from "recoil";
import { buildingRoomsState } from "./states";
import { BuildingRoomInfo, ModifyContract, RegisterContract, RequestNotification } from "./provider/types";
import BuildingManagementServiceProvider from "./provider";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { IBuildingRooms } from "./types";
import { Response } from "../../../../../libs/rest_apis/types";
import { Building } from "../../../../../libs/rest_apis/villife/building/types";

export default function useBuildingRoomContractor(): IBuildingRooms {
    const [buildingRooms, setBuildingRooms] = useRecoilState<BuildingRoomInfo[]>(buildingRoomsState);
    const service = new BuildingManagementServiceProvider();
    const user = useUserInformation();

    class BuildingRooms implements IBuildingRooms {
        private _buildingID: number | undefined = user?.adminInfomation?.selectedBuilding?.id;

        get buildingID(): number {
            if (this._buildingID === undefined) return 0;
            return this._buildingID;
        }

        get rooms(): BuildingRoomInfo[] {
            return buildingRooms;
        }

        public async updateRooms(): Promise<void> {
            setBuildingRooms(await service.getRoomInfos(this.buildingID));
        }

        public async deleteContract(contractID: number): Promise<boolean> {
            const isSuccessful = await service.deleteContract(contractID);

            if (isSuccessful) this.updateRooms();

            return isSuccessful;
        }

        public async modifyContract(params: ModifyContract.Params): Promise<boolean> {
            const isSuccessful = await service.modifyContract(params);

            if (isSuccessful) this.updateRooms();

            return isSuccessful;
        }

        public async registerContract(params: RegisterContract.Params): Promise<boolean> {
            const isSuccessful = await service.registerContract(params);

            if (isSuccessful) this.updateRooms();

            return isSuccessful;
        }

        public async requestNotification(params: RequestNotification.Params): Promise<boolean> {
            const isSuccessful = await service.requestNotification(params);

            return isSuccessful;
        }

        public async getRenterContract(): Response<Building.Contract> {
            const result = await service.getRenterContract();
            return result;
        }
    }

    return new BuildingRooms();
}
