import LocalStorage from "../../../libs/localstorage";
import { Storable } from "../types"

abstract class ATable implements Storable {
    readonly key: string = "";
    storage: LocalStorage = new LocalStorage(true); // EncriptStorage

    abstract get(): any;
    abstract set(data: any): any;
    abstract remove(): Promise<void>;
}

export default ATable;