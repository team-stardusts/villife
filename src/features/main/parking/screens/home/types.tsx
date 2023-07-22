import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { Vehicle } from "../../services/states/types";

type ParkingScreenProps = NativeStackScreenProps<VillifeStackParamList, "parking">;

export type VehicleInfoProps = {
    /* vehicleID: number;
    ownerType: VehicleOwnerType;
    plateNumber: string;
    phoneNumber: string;
    etd: Date; */
    vehicle: Vehicle;
};

export default ParkingScreenProps;
