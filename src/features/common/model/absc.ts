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

    /**
     * ViewModel에서 UserInfo를 가지고 있는데,
     * 뷰 단에서 useUserInformation을 또 부르기 낭비라고 생각되어 Get 프로퍼티로 뺌.
     */
    get user(): UserInfo {
        return this._user;
    }

    /**
     * ViewModel의 주가 되는 데이터로 뷰 단에서 사용할 State임.
     * State이므로 React hooks의 dependency로 등록할 수 있음.
     */
    get data(): ViewData {
        return this._data;
    }

    /**
     * ViewModel data를 업데이트 함.
     * 'update' 함수 안에서 서버에서 데이터를 가져오는 작업과 가져온 데이터를 저장하는 것까지 하는걸 의도함.
     * 만약 서버에서 데이터를 가져오는 작업을 실패할 경우 스토리지에서 저장된 데이터를 가져와서 전역 상태로 설정해야함.
     *      ex. this.restore.then((data) => data && this.setDate(data))
     * @param params 이 함수는 파라미터를 받지 않는 것을 기본으로 함. 하지만 불가피한 경우 사용하도록 any 타입으로 지정함.
     */
    public abstract update(params: any): Promise<void>;

    /**
     * 데이터를 스토리지에 저장할 때 사용할 Key를 생성함.
     * 임차인이 여러 계정을 사용할 때, 임대인이 여러 건물을 관리할 때를 고려해서 개발함.
     * @param user
     * @returns
     */
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

    /**
     * 스토리지에 저장된 데이터를 가져옴.
     * 이 때 Deserialize 과정을 거치는데,
     * 'deserializeStoredData'을 Override 한 경우에만 데이터가 변경됨.
     * @returns
     */
    protected async restore(): Promise<ViewData | null> {
        return this.deserializeStoredData(await this._storage.getItem(this._storageKey));
    }

    /**
     * 스토리지에 데이터를 저장함.
     * 입력 데이터가 있을 경우 입력 데이터를 저장함과 동시에 전역 상태를 변경하고,
     * 입력 데이터가 없는 경우 전역 상태를 저장함.
     * 스토리지에 데이터를 저장할 때 Serialize 과정을 거치는데,
     * 'serializeDataIntoStorage'을 Override 한 경우에만 데이터가 변경됨.
     * @returns
     */
    protected async save(data?: ViewData): Promise<void> {
        const dataIntoStorage = data ? data : this.data;

        const result = await this._storage.setItem(
            this._storageKey,
            dataIntoStorage ? this.serializeDataIntoStorage(dataIntoStorage) : null
        );

        if (result) this._setData(dataIntoStorage);

        !result && console.log("[ViewModelCommon]", "Failed to save data into storage");
    }

    /**
     * ViewModel data를 스토리지에 저장하기 전에 직렬화 하는 함수임.
     * 이 함수를 Override 하지 않으면 ViewModel 데이터를 그대로 저장함.
     * 스토리지에 데이터를 저장할 때는 JSON 형식으로 직렬화 과정을 거침. (직렬화 = JSON.stringify)
     * 이 때 클래스 인스턴스들도 String 형식으로 변환되는데, 변환된 스트링은
     * 역직렬화 과정을 거쳐도 다시 원상복구 되지 않음. (역직렬화 = JSON.parse)
     * 변환 과정을 거쳐도 사용할 수 있는 형태로 직렬화할 때 이 함수를 Override 해서 사용하면 됨
     * @param data
     * @returns
     */
    protected serializeDataIntoStorage(data: ViewData): StoredViewData {
        return data as any;
    }

    /**
     * ViewModel data를 스토리지에서 가져오기 전에 역직렬화 하는 함수임.
     * 이 함수를 Override 하지 않으면 직렬화된 스토리지 데이터를 그대로 역직렬화 하여 가져옴.
     * 스토리지에 데이터를 저장할 때는 JSON 형식으로 직렬화 과정을 거침. (직렬화 = JSON.stringify)
     * 이 때 클래스 인스턴스들도 String 형식으로 변환되는데, 변환된 스트링은
     * 역직렬화 과정을 거쳐도 다시 원상복구 되지 않음. (역직렬화 = JSON.parse)
     * 변환 과정을 거쳐도 사용할 수 있는 형태로 역직렬화할 때 이 함수를 Override 해서 사용하면 됨
     * @param data
     * @returns
     */
    protected deserializeStoredData(data: StoredViewData | null): ViewData | null {
        return data ? (data as any) : null;
    }
}

export default ViewModelCommmon;
