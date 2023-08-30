import { Parking } from "../../../../../../libs/rest_apis/villife/parking/types";
import { TimePickerTime } from "../../../../../common/atoms/time_picker/types";
import { EtdaTime } from "../../../blocks/etad_time_picker/types";
import { Vehicle, VehicleOwnerType } from "../../states/types";

export interface IParkingServiceProvider
    extends IVehicleGettable,
        IVehicleUpdatable,
        IVehicleRegisterable,
        IVehiclePushMessagable,
        IVehicleDeletable {}

interface IVehiclePushMessagable {
    sendMessage(params: SendMessageParams): Promise<boolean>;
}

interface IVehicleGettable {
    getVehicles(ownerType: VehicleOwnerType, buildingID?: number | undefined): Promise<Vehicle[]>;
}

interface IVehicleUpdatable {
    updateUserVehicleInfo(params: MyVehicleInfoUpdateParams): Promise<boolean>;
    updateUserVehicleETDA(params: MyVehicleEtdaUpdateParams): Promise<boolean>;
}

interface IVehicleRegisterable {
    registerUserVehicle(params: RegisterUserVehicleParams): Promise<Vehicle | null>;
    registerGuestVehicle(params: RegisterGuestVehicleParams): Promise<Vehicle | null>;
}

interface IVehicleDeletable {
    deleteVehicle(params: DeleteVehicleParams): Promise<boolean>;
}

export type DeleteVehicleParams = {
    type: "user" | "guest";
    vehicleID: number;
};

export type RegisterUserVehicleParams = {
    eta: TimePickerTime;
    etd: TimePickerTime;
    model: Parking.RegisterUserVehicle.Params["model"];
    plateNumber: Parking.RegisterUserVehicle.Params["plateNumber"];
    vehicleType: Parking.RegisterUserVehicle.Params["vehicleType"];
};

export type RegisterGuestVehicleParams = Parking.RegisterGuestVehicleToBuildingParams;

export type MyVehicleEtdaUpdateParams = {
    vehicleID: Parking.VehicleEtdaUpdateParams["vehicleID"];
    etda: EtdaTime;
};

export type MyVehicleInfoUpdateParams = Parking.VehicleInfopdateParams;

export type SendMessageParams = Parking.SendPushNotification.Params;
