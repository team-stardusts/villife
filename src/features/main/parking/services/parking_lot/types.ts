import { RequestedVehicleData } from "../../../../../libs/storage/tables/vehicle/types";
import { Vehicle, VehicleOwnerType } from "../states/types";
import {
    MyVehicleEtdaUpdateParams,
    MyVehicleInfoUpdateParams,
    RegisterGuestVehicleParams,
    RegisterUserVehicleParams,
    SendMessageParams,
    DeleteVehicleParams,
} from "./service/types";

export interface IParkingLot {
    vehicles: Vehicle[];
    userVehicles: Vehicle[];
    userVehiclesNotRegisted: RequestedVehicleData[];
    guestVehicles: Vehicle[];
    tenantVehicles: Vehicle[];
    updateVehicles(ownerType?: VehicleOwnerType): Promise<void>;
    updateUserVehicleEtda(params: MyVehicleEtdaUpdateParams): Promise<boolean>;
    updateUserVehicleInfo(params: MyVehicleInfoUpdateParams): Promise<boolean>;
    registerUserVehicle(params: ParkingLotRegisterUserVehicleParams): Promise<boolean>;
    registerGuestVehicle(params: RegisterGuestVehicleParams): Promise<boolean>;
    deleteVehicle(params: DeleteVehicleParams): Promise<boolean>;
    sendMessage(params: SendMessageParams): Promise<boolean>;
}

export type ParkingLotRegisterUserVehicleParams = {
    eta: RegisterUserVehicleParams["eta"];
    etd: RegisterUserVehicleParams["etd"];
    model: RegisterUserVehicleParams["model"];
    plateNumber: RegisterUserVehicleParams["plateNumber"];
    vehicleType: RegisterUserVehicleParams["vehicleType"];
};
