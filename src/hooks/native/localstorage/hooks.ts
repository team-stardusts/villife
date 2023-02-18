import LocalStorage from ".";

export default function useLocalStorage(encryption: boolean): LocalStorage {
    return new LocalStorage(encryption);
}

