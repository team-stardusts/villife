export type VehicleInfo = {
    plateNumber: string;
    model: string;
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
    onValidation?(validationResult: VehicleValidationResult): void;
    onTouchInputBox?(coordinate: TouchedCoordinate): void;
    onChangeVehicleInfo(vehicleInfo: VehicleInfo): void;
};
