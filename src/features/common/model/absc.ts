import { SetterOrUpdater } from "recoil";
import VillifeNativeClient from "../../../libs/villife-native-client";
import { UserInfo } from "../hooks/service/user_info/types";
import ViewModelStorage from "./storage";
import { Storage } from "./storage/type";
import { ViewModel } from "./types";

abstract class ViewModelCommmon<ViewData = any, StoredViewData = ViewData> implements ViewModel<ViewData> {
    protected _clientInstance: VillifeNativeClient = new VillifeNativeClient();
    protected _data: ViewData;
    protected _setData: SetterOrUpdater<ViewData>;
    protected _user: UserInfo;
    protected _storageKey: string;
    protected readonly _storage: Storage<StoredViewData>;
    public readonly featureName: string;

    constructor(user: UserInfo, featureName: string, data: ViewData, setData: SetterOrUpdater<ViewData>) {
        this._data = data;
        this._setData = setData;
        this.featureName = featureName;
        this._user = user;
        this._storageKey = this.createStorageKey(user);
        this._storage = ViewModelStorage.getInstance();
    }

    get user(): UserInfo {
        return this._user;
    }

    get data(): ViewData {
        return this._data;
    }

    protected createStorageKey(user: UserInfo): string {
        const keyArr = [user.roomID?.toString(), user.name];

        if (user.isAdmin) {
            if (user.adminInfomation?.selectedBuilding !== undefined) {
                keyArr.push(user.adminInfomation.selectedBuilding.id.toString());
            } else {
                keyArr.push("unknownBuilding");
            }
        }

        keyArr.push(this.featureName);
        return keyArr.join("_");
    }

    public abstract update(params: any): Promise<void>;

    protected async restore(): Promise<ViewData | null> {
        return this.deserializeStoredData(await this._storage.getItem(this._storageKey));
    }

    protected async save(data?: ViewData): Promise<void> {
        const dataIntoStorage = data ? data : this.data;

        const result = await this._storage.setItem(
            this._storageKey,
            dataIntoStorage ? this.serializeDataIntoStorage(dataIntoStorage) : null
        );

        if (result) this._setData(dataIntoStorage);

        !result && console.log("[ViewModelCommon]", "Failed to save data into storage");
    }

    protected serializeDataIntoStorage(data: ViewData): StoredViewData {
        return data as any;
    }

    protected deserializeStoredData(data: StoredViewData | null): ViewData | null {
        return data ? (data as any) : null;
    }
}

export default ViewModelCommmon;
