import { SetterOrUpdater, useRecoilState } from "recoil";
import useUserInformation from "../../../../../common/hooks/service/user_info";
import { UserInfo } from "../../../../../common/hooks/service/user_info/types";
import { notificationBoxState } from "./states";
import ViewModelCommmon from "../../../../../common/model/absc";
import Villife from "../../../../../../libs/villife-client/types";
import { PushMessageLog } from "./types";
import StardustDateParser from "../../../../../../libs/date_parser";

export default function useNotificationBoxViewModel() {
    const user = useUserInformation() as UserInfo;
    const [notis, setNotis] = useRecoilState(notificationBoxState);

    class NotificationBoxViewModel extends ViewModelCommmon<PushMessageLog[]> {
        private _api: Villife.Messaging.Client;

        constructor(user: UserInfo, data: PushMessageLog[], setData: SetterOrUpdater<PushMessageLog[]>) {
            super(user, "notification-box", data, setData);
            this._api = this._clientInstance.messaging;
        }

        public override async update(): Promise<void> {
            this._api
                .getPushMessageLogs()
                .then(async (r) => {
                    if (r !== undefined) {
                        await this.save(r.map(this.toViewModel));
                    }
                })
                .catch(async (err) => {
                    console.error("[NOTI_BOX_VIEWMODEL]", "occured while update data.", err);
                    if (err instanceof Error) {
                        console.error(err.stack);
                    }

                    const storedData = await this.restore();

                    if (storedData !== null) {
                        this.save(
                            storedData.map((v) => {
                                v.createdAt = new Date(v.createdAt);

                                return v;
                            })
                        );
                    }
                });
        }

        private toViewModel(data: Villife.Messaging.PushMessageLog): PushMessageLog {
            const _data: any = data;
            _data.createdAt = StardustDateParser.deserialize(data.createdAt);

            return _data;
        }
    }

    return new NotificationBoxViewModel(user, notis, setNotis);
}
