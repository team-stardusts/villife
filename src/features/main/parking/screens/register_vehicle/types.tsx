import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { EtdaTime } from "../../blocks/etad_time_picker/types";

type RegisterVehicleScreenProps = NativeStackScreenProps<VillifeStackParamList, "register_vehicle">;

export type Vehicle = EtdaTime & {
    plateNumber: string;
    model: string;
};

export default RegisterVehicleScreenProps;
