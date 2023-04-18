import { EventRegister } from "react-native-event-listeners";
import LocalStorage from "../localstorage";
import { Storable } from "./types";

abstract class ATable implements Storable {
    readonly key: string = "";
    storage: LocalStorage = new LocalStorage(true); // EncriptStorage

    abstract get(): any;
    abstract set(data: any): any;
    abstract remove(): Promise<void>;
}

export default ATable;
