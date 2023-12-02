import { VILLIFE_AUTHORITY } from "./data/authority";
import { Villife } from "./types";

class VillifeClient implements Villife.Client {
    get auth() {
        return;
    }
}

export default VillifeClient;
export { VILLIFE_AUTHORITY };
