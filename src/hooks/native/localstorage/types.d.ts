import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from 'react-native-encrypted-storage';
    
declare export type StorageType = typeof AsyncStorage | typeof EncryptedStorage;

declare export interface ILocalStorage {
    readonly Storage: StorageType;
    setItem(key: string, value: any): Promise<boolean>;
    getItem(key: string): Promise<any | null>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}