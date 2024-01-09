import { SetterOrUpdater, useRecoilState } from "recoil";
import useUserInformation from "../../../../../common/hooks/service/user_info";
import { UserInfo } from "../../../../../common/hooks/service/user_info/types";
import { latestNotificationIdState, notificationBoxState } from "./states";
import ViewModelCommmon from "../../../../../common/model/absc";
import Villife from "../../../../../../libs/villife-client/types";
import { PushMessageLog } from "./types";
import StardustDateParser from "../../../../../../libs/date_parser";
import { Storage } from "../../../../../common/model/storage/type";
import ViewModelStorage from "../../../../../common/model/storage";

export default function useNotificationBoxViewModel() {
    const user = useUserInformation() as UserInfo;
    const [notis, setNotis] = useRecoilState(notificationBoxState);
    const [latestId, setLatestId] = useRecoilState(latestNotificationIdState);

    class NotificationBoxViewModel extends ViewModelCommmon<PushMessageLog[], Villife.Messaging.PushMessageLog[]> {
        private _api: Villife.Messaging.Client;
        private _latestNotiStorage: Storage<number> = ViewModelStorage.getInstance();
        private _latestNotiStorageKey: string;

        constructor(user: UserInfo, data: PushMessageLog[], setData: SetterOrUpdater<PushMessageLog[]>) {
            super(user, "notification-box", data, setData);
            this._api = this._clientInstance.messaging;
            this._latestNotiStorageKey = this.createStorageKey(user) + "-latest-noti-id";
        }

        get notReadNotiIds(): number[] {
            if (latestId === 0) return [];
            const ids: number[] = [];

            for (let noti of this.data) {
                if (noti.id > latestId) ids.push(noti.id);
                //if (noti.id > 200) ids.push(noti.id);
            }

            return ids;
        }

        protected override serializeDataIntoStorage(data: PushMessageLog[]): Villife.Messaging.PushMessageLog[] {
            const notis: Villife.Messaging.PushMessageLog[] = [];

            for (let noti of data) {
                const _noti: any = { ...noti };
                _noti.createdAt = StardustDateParser.serialize(noti.createdAt);
                notis.push(_noti);
            }

            return notis;
        }

        protected override deserializeStoredData(data: Villife.Messaging.PushMessageLog[]): PushMessageLog[] {
            const notis: PushMessageLog[] = [];

            for (let noti of data) {
                const _noti: any = { ...noti };
                _noti.createdAt = StardustDateParser.deserialize(noti.createdAt);
                notis.push(_noti);
            }

            return notis;
        }

        public override async update(): Promise<void> {
            const id = await this._latestNotiStorage.getItem(this._latestNotiStorageKey);

            if (id !== null) setLatestId(id);

            await this._api
                .getPushMessageLogs()
                .then((r) => {
                    if (r !== undefined) {
                        this.save(this.deserializeStoredData(r));
                    }

                    return r;
                })
                .catch(async (err) => {
                    console.error("[NOTI_BOX_VIEWMODEL]", "occured while update data.", err);
                    if (err instanceof Error) {
                        console.error(err.stack);
                    }

                    const storedData = await this.restore();

                    if (storedData !== null) {
                        this.save(storedData);
                    }

                    return storedData ?? [];
                });
        }

        public async processByReading(): Promise<void> {
            if (this.data.length === 0) return;

            const _latestId = Math.max(...this.data.map((d) => d.id));
            setLatestId(_latestId);
            await this._latestNotiStorage.setItem(this._latestNotiStorageKey, _latestId);
        }
    }

    return new NotificationBoxViewModel(user, notis, setNotis);
}
