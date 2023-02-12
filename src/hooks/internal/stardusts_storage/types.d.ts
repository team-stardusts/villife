import type LocalStorage from "../../native/localstorage";
import type LoginTable from "./tables/login";


export default interface IStardustsStorage {
    login: LoginTable;
}

export interface ITable {
    private key: string;
    storage: LocalStorage;
}