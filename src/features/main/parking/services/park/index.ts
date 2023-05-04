import { useEffect } from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import IVillifeParkingManager, {
    GuestVehicle,
    TenantVehicle,
} from "../../../../../libs/rest_apis/villife/parking/types";
import { ParkServiceReturns } from "./types";

export default function useParkService(): ParkServiceReturns {
    const parkManager: IVillifeParkingManager = VillifeServer.getParkingManager();

    const getMyVehicles = async (): Promise<TenantVehicle[]> => {
        const result = await parkManager.getMyVehicles();

        if (result.data?.data !== undefined) {
            return result.data.data;
        }

        return [];
    };

    const getVehicles = async (): Promise<TenantVehicle[]> => {
        const result = await parkManager.getBuildingRegistedVehicles();

        if (result.data?.data !== undefined) {
            return result.data.data;
        }

        return [];
    };

    const getGuestVehicles = async (): Promise<GuestVehicle[]> => {
        const result = await parkManager.getBuildingGuestVehicles();

        if (result.data?.data !== undefined) {
            return result.data.data;
        }

        return [];
    };

    return {
        getMyVehicles,
        getVehicles,
        getGuestVehicles,
    };
}
