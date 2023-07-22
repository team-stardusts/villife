import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { VehicleOwnerType } from "../../services/states/types";

type ParkingScreenProps = NativeStackScreenProps<VillifeStackParamList, "parking">;

export type VehicleInfoProps = {
    vehicleID: number;
    ownerType: VehicleOwnerType;
    plateNumber: string;
    phoneNumber: string;
    etd: Date;
};

export default ParkingScreenProps;
