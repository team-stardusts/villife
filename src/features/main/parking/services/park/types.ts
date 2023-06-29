import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { EtdaTime } from "../../blocks/etad_time_picker/types";
import { VehiclesStateType } from "../state/types";

export type ParkServiceReturns = {
    vehicles: VehiclesStateType;
    updateMyVehicleEtda(params: MyVehicleEtdaUpdateServiceParams): Promise<boolean>;
    updateMyVehicleInfo(params: Parking.VehicleInfopdateParams): Promise<boolean>;
    registerGuestVehicleToBuilding(params: Parking.RegisterGuestVehicleToBuildingParams): Promise<boolean>;
};

export type MyVehicleEtdaUpdateServiceParams = {
    vehicleID: Parking.VehicleEtdaUpdateParams["vehicleID"];
    etda: EtdaTime;
};

export type Vehicle = TenantVehicle | GuestVehicle;

export type TenantVehicle = {
    id: Parking.TenantVehicle["id"];
    room_number: Parking.TenantVehicle["room_number"];
    phone_number: Parking.TenantVehicle["phone_number"];
    model: Parking.TenantVehicle["model"];
    plate_number: Parking.TenantVehicle["plate_number"];
    vehicle_type: Parking.TenantVehicle["vehicle_type"];
    etd: Date;
    eta: Date;
};

export type GuestVehicle = TenantVehicle & {
    visiting_perpose: Parking.GuestVehicle["visiting_perpose"];
};
