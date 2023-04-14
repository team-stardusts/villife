import LoginTable from "./tables/login";
import IVillifeStorage from "./types";

class VillifeStorage implements IVillifeStorage {
    login = new LoginTable();
}

export default VillifeStorage;
