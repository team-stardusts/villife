import EncryptedStorage from "react-native-encrypted-storage";
import { Storage } from "./type";

class ViewModelStorage<T> implements Storage<T> {
    private static _instance: Storage | null = null;

    public static getInstance(): Storage<any> {
        if (ViewModelStorage._instance === null) {
            ViewModelStorage._instance = new ViewModelStorage();
        }

        return ViewModelStorage._instance;
    }

    public async getItem(key: string): Promise<T | null> {
        try {
            const value = await EncryptedStorage.getItem(key);
            if (value === undefined) {
                console.log(key, await EncryptedStorage.getItem(key));
            }

            if (value !== null) {
                return JSON.parse(value);
            }

            return null;
        } catch (e) {
            console.log("Error importing items from view model storage.");
            console.log("Error:", e, key);

            return null;
        }
    }
    public async setItem(key: string, value: T): Promise<boolean> {
        let didSucceed: boolean = true;

        try {
            const strVal: string = JSON.stringify(value);

            await EncryptedStorage.setItem(key, strVal);
        } catch (e: any) {
            didSucceed = false;
            console.log("Error setting items into view model storage.");
            console.log("Error:", e);
        }

        return didSucceed;
    }
    public async removeItem(key: string): Promise<boolean> {
        let didSucceed: boolean = true;

        try {
            await EncryptedStorage.removeItem(key);
        } catch (e: any) {
            didSucceed = false;
            console.log("Error removing items in view model storage.");
            console.log("Error:", e);
        }

        return didSucceed;
    }
}

export default ViewModelStorage;
