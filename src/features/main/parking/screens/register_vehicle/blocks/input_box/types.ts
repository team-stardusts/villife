export type VehicleInfo = {
    plateNumber: string | null;
    model: string | null;
};

export type TouchedCoordinate = {
    x: number;
    y: number;
};

export type VehicleValidationResult = {
    plateNumber: boolean;
    model: boolean;
};

export type VehicleInfoInputBoxProps = {
    initialVehicleInfo?: VehicleInfo;
    onChangeVehicleInfo(vehicleInfo: VehicleInfo): void;
};
