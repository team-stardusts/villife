import { Vehicle, VehicleOwnerType } from "../states/types";
import {
    MyVehicleEtdaUpdateParams,
    MyVehicleInfoUpdateParams,
    RegisterGuestVehicleParams,
    RegisterUserVehicleParams,
    SendMessageParams,
    DeleteVehicleParams,
} from "./provider/types";

export interface IParkingLot {
    vehicles: Vehicle[];
    userVehicles: Vehicle[];
    guestVehicles: Vehicle[];
    tenantVehicles: Vehicle[];
    updateVehicles(ownerType?: VehicleOwnerType): Promise<void>;
    updateUserVehicleEtda(params: MyVehicleEtdaUpdateParams): Promise<boolean>;
    updateUserVehicleInfo(params: MyVehicleInfoUpdateParams): Promise<boolean>;
    registerUserVehicle(params: RegisterUserVehicleParams): Promise<boolean>;
    registerGuestVehicle(params: RegisterGuestVehicleParams): Promise<boolean>;
    deleteVehicle(params: DeleteVehicleParams): Promise<boolean>;
    sendMessage(params: SendMessageParams): Promise<boolean>;
}
