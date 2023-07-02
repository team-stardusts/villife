import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { TimePickerTime } from "../../../../common/atoms/time_picker/types";
import { EtdaTime } from "../../blocks/etad_time_picker/types";
import { GuestVehicleStateType, TenantVehicleStateType, VehiclesStateType } from "../states/types";

export type ParkServiceReturns = {
    userVehicles: TenantVehicleStateType;
    tenantVehicles: TenantVehicleStateType;
    guestVehicles: GuestVehicleStateType;
    updateUserVehicleEtda(params: MyVehicleEtdaUpdateServiceParams): Promise<boolean>;
    updateUserVehicleInfo(params: Parking.VehicleInfopdateParams): Promise<boolean>;
    registerGuestVehicleToBuilding(params: Parking.RegisterGuestVehicleToBuildingParams): Promise<boolean>;
    registerUserVehicle(params: RegisterUserVehicleParams): Promise<boolean>;
};

export type RegisterUserVehicleParams = {
    eta: TimePickerTime;
    etd: TimePickerTime;
    model: Parking.RegisterUserVehicle.Params["model"];
    plateNumber: Parking.RegisterUserVehicle.Params["plateNumber"];
    vehicleType: Parking.RegisterUserVehicle.Params["vehicleType"];
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
