import type LocalStorage from "../../libs/localstorage";
import type LoginTable from "./tables/login";


export default interface IStardustsStorage {
    login: LoginTable;
}

export interface Storable {
    readonly key: string;
    
    storage: LocalStorage;
}