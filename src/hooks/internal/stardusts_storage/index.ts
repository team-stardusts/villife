import LoginTable from "./tables/login";
import IStardustsStorage from "./types";


class StardustsStorage implements IStardustsStorage {
    login = new LoginTable();
}


export default function useStardustsStorage(): StardustsStorage {
    return new StardustsStorage();
}