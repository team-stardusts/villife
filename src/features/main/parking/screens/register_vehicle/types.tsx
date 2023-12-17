import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { EtdaTime } from "../../blocks/etad_time_picker/types";
import { VehicleInfo } from "./blocks/input_box/types";

type RegisterVehicleScreenProps = NativeStackScreenProps<VillifeStackParamList, "register_vehicle">;

export type VehicleChunk = EtdaTime & VehicleInfo;

export default RegisterVehicleScreenProps;
