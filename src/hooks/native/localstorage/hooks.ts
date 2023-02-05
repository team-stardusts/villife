import LocalStorage from "../../api/native/localstorage";

export default function useLocalStorage(encryption: boolean): LocalStorage {
    return new LocalStorage(encryption);
}

