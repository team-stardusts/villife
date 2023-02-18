import LocalStorage from "../../../native/localstorage";
import { ITable } from "../types"
import { LoginDataType } from "./types";

abstract class ATable implements ITable {
    readonly key: string = "";
    storage: LocalStorage = new LocalStorage(true); // EncriptStorage

    abstract get(): any;
    abstract set(data: any): any;
    abstract remove(): Promise<void>;
}

export default ATable;