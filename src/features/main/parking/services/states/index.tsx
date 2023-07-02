import { atom } from "recoil";
import { GuestVehicleStateType, TenantVehicleStateType } from "./types";

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
