export type GuestVehicleInfo = {
    plateNumber: string;
    phoneNumber: string;
    visitingPerpose: string;
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
    onValidation?(validationResult: GuestVehicleValidationResult): void;
    onTouchInputBox?(coordinate: TouchedCoordinate): void;
    onChangeGuestVehicleInfo(vehicleInfo: GuestVehicleInfo): void;
};
