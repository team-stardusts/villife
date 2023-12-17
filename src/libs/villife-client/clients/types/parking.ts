namespace VillifeParking {
    export interface Client {
        deleteUserVehicle(vehicleId: number): Promise<string>;
        deleteGuestVehicle(vehicleId: number): Promise<string>;
        getUserVehicles(): Promise<TenantVehicle[]>;
        getVehicles(buildingId: number): Promise<TenantVehicle[]>;
        getGuestVehicles(buildingId: number): Promise<GuestVehicle[]>;
        registerUserVehicle(params: VehicleRegistrationForm): Promise<number>;
        registerGuestVehicle(params: GuestVehicleRegistrationForm): Promise<GuestVehicle>;
        sendPushNotification(params: NotificationForm): Promise<string>;
        updateUserVehicleETDA(params: VehicleETDAUpdateForm): Promise<string>;
        updateUserVehicleInfo(params: VehicleInfoUpdateForm): Promise<string>;
    }

    export type GuestVehicleRegistrationForm = VehicleRegistrationForm & {
        guestPhoneNumber: string;
        visitingPurpose: string;
    };

    export type GuestVehicle = TenantVehicle & {
        visitingPurpose: string;
    };

    export type NotificationForm = {
        vehicleId: number;
        title: string;
        content: string;
    };

    export type TenantVehicle = {
        etd: number;
        eta: number;
        id: number;
        model: string;
        phoneNumber: string;
        plateNumber: string;
        roomNumber: number;
        vehicleType: VehicleType;
    };

    export type VehicleETDAUpdateForm = {
        vehicleId: number;
        eta: number;
        etd: number;
    };

    export type VehicleInfoUpdateForm = {
        vehicleId: number;
        model: string;
        plateNumber: string;
    };

    export type VehicleRegistrationForm = {
        eta: number;
        etd: number;
        model: string;
        plateNumber: string;
        vehicleType: VehicleType;
    };

    export type VehicleType = "4WD" | "2WD";
}

export default VillifeParking;
