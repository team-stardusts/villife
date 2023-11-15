import LocalStorage from "../localstorage";

export interface Storable {
    readonly key: string;

    storage: LocalStorage;
}

export interface TableUsable<KeyType, DataType> {
    readonly key: KeyType;

    get(): Promise<DataType | null>;
    set(data: DataType | null): Promise<boolean>;
    remove(): Promise<void>;
}
