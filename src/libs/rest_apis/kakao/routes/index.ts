import { RoutesType } from "./types";

const routes: RoutesType = {
    local: {
        default: "local",
        search: {
            default: "local/search",
            address: "local/search/address.json"
        }
    }
} as const;

export default routes;