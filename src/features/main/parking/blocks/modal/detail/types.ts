import { Vehicle } from "../../../viewmodel/states";

export type VehicleDetailAlertProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    vehicle: Vehicle;
    userRoomNumber: number | undefined;
};

export type VehicleKeyValuePair = {
    key: string;
    value: string;
};

export type VehicleDetailModalDate = {
    date: string;
    time: string;
};
