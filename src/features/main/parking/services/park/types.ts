import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { TimePickerTime } from "../../../../common/atoms/time_picker/types";
import { EtdaTime } from "../../blocks/etad_time_picker/types";
import { Vehicle, VehicleOwnerType } from "../states/types";

export type ParkServiceReturns = {
    // vehicles: Vehicle[];
    getVehiclesByOwnerType(ownerType: VehicleOwnerType): Promise<Vehicle[]>;
    updateVehicles(ownerType?: VehicleOwnerType): Promise<void>;
    updateUserVehicleEtda(params: MyVehicleEtdaUpdateServiceParams): Promise<boolean>;
    updateUserVehicleInfo(params: Parking.VehicleInfopdateParams): Promise<boolean>;
    registerGuestVehicleToBuilding(params: Parking.RegisterGuestVehicleToBuildingParams): Promise<boolean>;
    registerUserVehicle(params: RegisterUserVehicleParams): Promise<boolean>;
    sendMessage(params: Parking.SendPushNotification.Params): Promise<boolean>;
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
