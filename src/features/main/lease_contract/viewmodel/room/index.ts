import { SetterOrUpdater, useRecoilState } from "recoil";
import Villife from "../../../../../libs/villife-client/types";
import useUserInformation from "../../../../common/hooks/service/user_info";
import { UserInfo } from "../../../../common/hooks/service/user_info/types";
import ViewModelCommmon from "../../../../common/model/absc";
import roomsState from "./states";

export default function useRoomViewModel() {
    const user = useUserInformation();
    const [rooms, setRooms] = useRecoilState(roomsState);

    if (user === null) return null;

    class RoomContractViewModel extends ViewModelCommmon<Villife.Contract.Room[]> {
        private _api: Villife.Contract.Client;
        protected _data: Villife.Contract.Room[] = rooms;
        protected _setData: SetterOrUpdater<Villife.Contract.Room[]> = setRooms;
        public readonly feature: string = "contract-room";

        constructor(user: UserInfo) {
            super(user);
            this._api = this._clientInstance.contract;
        }

        public async update(): Promise<void> {
            if (this._user.adminInfomation?.selectedBuilding === undefined) return;

            await this._api
                .getRoomsInBuilding(this._user.adminInfomation.selectedBuilding.id)
                .then((res) => setRooms(res))
                .catch((err) => {
                    console.log(err);
                });
        }

        public async createContract(params: Villife.Contract.RequestForm): Promise<boolean> {
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
    }

    return new RoomContractViewModel(user);
}
