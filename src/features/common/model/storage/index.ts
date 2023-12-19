import EncryptedStorage from "react-native-encrypted-storage";
import { Storage } from "./type";

class ViewModelStorage<T> implements Storage<T> {
    private static _instance: Storage | null = null;
    public readonly _key: string;

    private constructor(key: string) {
        this._key = key;
    }

    public static getInstance(key: string): Storage<any> {
        if (ViewModelStorage._instance === null) {
            ViewModelStorage._instance = new ViewModelStorage(key);
        }

        return ViewModelStorage._instance;
    }

    get key(): string {
        return this._key;
    }

    public async getItem(): Promise<T | null> {
        try {
            const value = await EncryptedStorage.getItem(this._key);

            if (value !== null) {
                return JSON.parse(value);
            }

            return null;
        } catch (e) {
            console.log("Error importing items from view model storage.");
            console.log("Error:", e);

            return null;
        }
    }
    public async setItem(value: T): Promise<boolean> {
        let didSucceed: boolean = true;

        try {
            const strVal: string = JSON.stringify(value);

            await EncryptedStorage.setItem(this._key, strVal);
        } catch (e: any) {
            didSucceed = false;
            console.log("Error setting items into view model storage.");
            console.log("Error:", e);
        }

        return didSucceed;
    }
    public async removeItem(): Promise<boolean> {
        let didSucceed: boolean = true;

        try {
            await EncryptedStorage.removeItem(this._key);
        } catch (e: any) {
            didSucceed = false;
            console.log("Error removing items in view model storage.");
            console.log("Error:", e);
        }

        return didSucceed;
    }
}

export default ViewModelStorage;
