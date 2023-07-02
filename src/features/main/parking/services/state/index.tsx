import { atom } from "recoil";
import { GuestVehicleStateType, TenantVehicleStateType, VehiclesStateType } from "./types";

export const vehiclesState = atom<VehiclesStateType>({
    key: "vehiclesState",
    default: {
        userVehicles: [],
        vehicles: [],
        guestVehicles: [],
    },
});

export const userVehiclesState = atom<TenantVehicleStateType>({
    key: "userVehiclesState",
    default: [],
});

export const tenantVehiclesState = atom<TenantVehicleStateType>({
    key: "tenantVehiclesState",
    default: [],
});

export const guestVehiclesState = atom<GuestVehicleStateType>({
    key: "guestVehiclesState",
    default: [],
});
