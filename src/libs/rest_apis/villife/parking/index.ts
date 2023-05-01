import { Response } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeParkingManager, { GuestVehicle, TenantVehicle } from "./types";

class VillifeParkginManager extends AVillifeServerModule implements IVillifeParkingManager {
    /**
     * @param getMyVehicles
     * @warn
     */
    public async getMyVehicles(): Response<TenantVehicle[]> {
        const route: string = "test";

        return await this.requestAuthable<any, TenantVehicle[]>({
            method: "get",
            url: route,
        });
    }

    /**
     * @param getBuildingRegistedVehicles
     * @warn
     */
    public async getBuildingRegistedVehicles(): Response<TenantVehicle[]> {
        const route: string = "test";

        return await this.requestAuthable<any, TenantVehicle[]>({
            method: "get",
            url: route,
        });
    }

    /**
     * @param getBuildingGuestVehicles
     * @warn
     */
    public async getBuildingGuestVehicles(): Response<GuestVehicle[]> {
        const route: string = "test";

        return await this.requestAuthable<any, GuestVehicle[]>({
            method: "get",
            url: route,
        });
    }
}

export default VillifeParkginManager;
