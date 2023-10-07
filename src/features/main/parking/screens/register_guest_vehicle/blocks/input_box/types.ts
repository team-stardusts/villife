export type GuestVehicleInfo = {
    plateNumber: string | null;
    phoneNumber: string | null;
    visitingPerpose: string | null;
};

export type TouchedCoordinate = {
    x: number;
    y: number;
};

export type GuestVehicleValidationResult = {
    plateNumber: boolean;
    phoneNumber: boolean;
    visitingPerpose: boolean;
};

export type GuestVehicleInfoInputBoxProps = {
    initialVehicleInfo?: GuestVehicleInfo;
    onChangeGuestVehicleInfo(vehicleInfo: GuestVehicleInfo): void;
};
