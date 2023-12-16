import { SetterOrUpdater } from "recoil";
import VillifeNativeClient from "../../../libs/villife-native-client";
import { UserInfo } from "../hooks/service/user_info/types";
import ViewModelStorage from "./storage";
import { Storage } from "./storage/type";
import { ViewModel } from "./types";

abstract class ViewModelCommmon<ViewData = any> implements ViewModel<ViewData> {
    protected _clientInstance: VillifeNativeClient = new VillifeNativeClient();
    protected abstract _data: ViewData;
    protected abstract _setData: SetterOrUpdater<ViewData>;
    protected _user: UserInfo;
    protected _storageKey: string;
    protected readonly _storage: Storage<ViewData>;
    public abstract readonly feature: string;

    constructor(user: UserInfo) {
        this._user = user;
        this._storageKey = this.createStorageKey(user);
        this._storage = new ViewModelStorage(this._storageKey);
    }

    get user(): UserInfo {
        return this._user;
    }

    get data(): ViewData {
        return this._data;
    }

    private createStorageKey(user: UserInfo): string {
        const keyArr = [user.roomID.toString(), user.name];

        if (user.isAdmin) {
            if (user.adminInfomation?.selectedBuilding !== undefined) {
                keyArr.push(user.adminInfomation.selectedBuilding.id.toString());
            } else {
                keyArr.push("unknownBuilding");
            }
        }

        keyArr.push(this.feature);

        return keyArr.join("_");
    }

    public abstract update(params: any): Promise<void>;

    public async restore(): Promise<void> {
        const result = await this._storage.getItem();

        if (result !== null) this._setData(result);
    }

    public async save(): Promise<void> {
        const result = await this._storage.setItem(this._data);
        !result && console.log("[ViewModelCommon]", "Failed to save data into storage");
    }
}

export default ViewModelCommmon;
