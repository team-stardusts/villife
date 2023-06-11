import { useEffect } from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import IVillifeParkingManager, { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { ParkServiceReturns } from "./types";

export default function useParkService(): ParkServiceReturns {
    const parkManager: IVillifeParkingManager = VillifeServer.getParkingManager();

    const getMyVehicles = async (): Promise<Parking.TenantVehicle[]> => {
        const result = await parkManager.getMyVehicles();

        if (result.data?.data !== undefined) {
            return result.data.data;
        }

        return [];
    };

    const getVehicles = async (): Promise<Parking.TenantVehicle[]> => {
        const result = await parkManager.getBuildingRegistedVehicles();

        if (result.data?.data !== undefined) {
            return result.data.data;
        }

        return [];
    };

    const getGuestVehicles = async (): Promise<Parking.GuestVehicle[]> => {
        const result = await parkManager.getBuildingGuestVehicles();

        if (result.data?.data !== undefined) {
            return result.data.data;
        }

        return [];
    };

    const updateMyVehicleEtda = async (params: Parking.VehicleEtdaUpdateParams): Promise<boolean> => {
        return (await parkManager.updateMyVehicleEtda(params)).isSuccessful;
    };

    const updateMyVehicleInfo = async (params: Parking.VehicleInfopdateParams): Promise<boolean> => {
        return (await parkManager.updateMyVehicleInfo(params)).isSuccessful;
    };

    return {
        getMyVehicles,
        getVehicles,
        getGuestVehicles,
        updateMyVehicleEtda,
        updateMyVehicleInfo,
    };
}
