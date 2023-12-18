import { SetterOrUpdater, useRecoilState } from "recoil";
import Villife from "../../../../../libs/villife-client/types";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import ViewModelCommmon from "../../../../common/model/absc";
import roomsState, { RoomInfo } from "./states";

export default function useRoomViewModel() {
    const user = useUserInformation();
    const [rooms, setRooms] = useRecoilState(roomsState);

    if (user === null) return null;

    class RoomContractViewModel extends ViewModelCommmon<RoomInfo[]> {
        private _api: Villife.Contract.Client;

        constructor(user: UserInfo, data: RoomInfo[], setData: SetterOrUpdater<RoomInfo[]>) {
            super(user, "contract-room", data, setData);
            this._api = this._clientInstance.contract;
        }

        public override async update(): Promise<void> {
            if (this._user.adminInfomation?.selectedBuilding === undefined) return;

            await this._api
                .getRoomsInBuilding(this._user.adminInfomation.selectedBuilding.id)
                .then((res) => {
                    const rooms: RoomInfo[] = [];

                    for (let room of res) {
                        const _room: any = room;
                        _room.contractInfo.expirationDate = new Date(room.contractInfo.expirationDate);
                        _room.contractInfo.startDate = new Date(room.contractInfo.startDate);

                        rooms.push(_room);
                    }

                    this._setData(rooms);
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        public async createContract(params: Villife.Contract.CreateForm): Promise<boolean> {
            return await this._api
                .createContract(params)
                .then(() => true)
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        }

        public async updateContract(params: Villife.Contract.UpdateForm): Promise<boolean> {
            return await this._api
                .updateContract(params)
                .then(() => true)
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        }

        public async deleteContract(contractId: number): Promise<boolean> {
            return await this._api
                .deleteContract(contractId)
                .then(() => true)
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        }

        public async sendNotification(params: Villife.Contract.NotiForm): Promise<boolean> {
            return await this._api
                .sendNotification(params)
                .then(() => {
                    return true;
                })
                .catch((err) => {
                    //console.error(err);
                    return false;
                });
        }

        public async createMemo(contractId: number, memoType: string, content: string): Promise<boolean> {
            if (user?.adminInfomation?.selectedBuilding === undefined) {
                return false;
            }

            return await this._api
                .createMemo({
                    buildingId: user.adminInfomation.selectedBuilding.id,
                    contractId,
                    content,
                    memoType,
                })
                .then(async () => {
                    await this.update();
                    return true;
                })
                .catch((err) => {
                    return false;
                });
        }

        public async deleteMemo(memoId: number): Promise<boolean> {
            if (user?.adminInfomation?.selectedBuilding === undefined) {
                return false;
            }

            return await this._api
                .deleteMemo({
                    buildingId: user.adminInfomation.selectedBuilding.id,
                    memoId,
                })
                .then(async () => {
                    await this.update();
                    return true;
                })
                .catch((err) => {
                    return false;
                });
        }

        public async updateMemo(memoId: number, content: string): Promise<boolean> {
            if (user?.adminInfomation?.selectedBuilding === undefined) {
                return false;
            }

            return await this._api
                .updateMemo({
                    buildingId: user.adminInfomation.selectedBuilding.id,
                    content,
                    memoId,
                })
                .then(async () => {
                    await this.update();
                    return true;
                })
                .catch((err) => {
                    //console.error(err);
                    return false;
                });
        }
    }

    return new RoomContractViewModel(user, rooms, setRooms);
}
