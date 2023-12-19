import useParkingViewmodel from "../../../viewmodel";
import { Vehicle, VehicleOwnerType } from "../../../viewmodel/types";

export type VehicleDetailAlertProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    vehicle: Vehicle;
    userRoomNumber: number | undefined;
    deleteVehicle(type: VehicleOwnerType, vehicleId: number): Promise<boolean>;
};

export type VehicleKeyValuePair = {
    key: string;
    value: string;
};

export type VehicleDetailModalDate = {
    date: string;
    time: string;
};
