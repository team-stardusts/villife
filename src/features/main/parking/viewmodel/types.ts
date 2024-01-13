import { Villife } from "@team-stardusts/villife-client";
import { EtdaTime } from "../blocks/etad_time_picker/types";

export type GuestVehicleRegistrationForm = VehicleRegistrationFormCommon & {
    ownerType: "guest";
    guestPhoneNumber: Villife.Parking.GuestVehicleRegistrationForm["guestPhoneNumber"];
    visitingPurpose: Villife.Parking.GuestVehicleRegistrationForm["visitingPurpose"];
};

export type RequestedVehicle = {
    buildingName: string;
    eta: number;
    etd: number;
    ownerId: number;
    plateNumber: string;
    roomNumber: number;
    vehicleModel: string;
    vehicleType: Villife.Parking.VehicleType;
};

export type UserVehicleRegistrationForm = VehicleRegistrationFormCommon & {
    ownerType: "user";
};

export type VehicleETDAUpdateForm = {
    vehicleId: Villife.Parking.VehicleETDAUpdateForm["vehicleId"];
    etda: EtdaTime;
};

export type VehicleRegistrationFormCommon = {
    eta: Date;
    etd: Date;
    model: Villife.Parking.VehicleRegistrationForm["model"];
    plateNumber: Villife.Parking.VehicleRegistrationForm["plateNumber"];
    vehicleType: Villife.Parking.VehicleRegistrationForm["vehicleType"];
};

export type VehicleRegistrationForm = UserVehicleRegistrationForm | GuestVehicleRegistrationForm;

export type VehicleOwnerType = "user" | "tenant" | "guest";

export type Vehicle = {
    ownerType: VehicleOwnerType;
    etd: Date;
    eta: Date;
    id: number;
    model: Villife.Parking.TenantVehicle["model"];
    phoneNumber: Villife.Parking.TenantVehicle["phoneNumber"];
    plateNumber: Villife.Parking.TenantVehicle["plateNumber"];
    roomNumber: Villife.Parking.TenantVehicle["roomNumber"];
    vehicleType: Villife.Parking.TenantVehicle["vehicleType"];
    visitingPurpose?: string;
};
