import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from 'react-native-encrypted-storage';
import { ILocalStorage, StorageType } from "./types";


class LocalStorage implements ILocalStorage{
    readonly Storage: StorageType;
    
    constructor(encryption: boolean) {
        this.Storage = encryption ? EncryptedStorage : AsyncStorage;
    }

    public async setItem(key: string, value: any): Promise<boolean> {
        let didSucceed: boolean = true;

        try {
            const strVal: string = JSON.stringify(value);
            
            await this.Storage.setItem(key, strVal);
        } 
        catch (e: any) {
            didSucceed = false;
            console.error("setItem Error", e.message);
        }
        finally {
            return didSucceed;
        }
    }

    public async getItem(key: string): Promise<any | null> {
        try {
            const value: string|null = await this.Storage.getItem(key);
            
            if (value !== null) {
                const data: any = JSON.parse(value);

                return data;
            }
        } catch (e: any) {
            console.error("getItem Error", e.message);
        }

        return null;
    }

    public async removeItem(key: string): Promise<void> {
        try {
            await this.Storage.removeItem(key);
        } catch (e: any) {
            console.error(e.message);
        }

        return;
    }

    public async clear(): Promise<void> {
        try {
            await this.Storage.clear();
        } catch (e: any) {
            console.error(e.message);
        }

        return;
    }
}

export default LocalStorage;