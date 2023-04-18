import LocalStorage from "../localstorage";

export interface Storable {
    readonly key: string;

    storage: LocalStorage;
}
