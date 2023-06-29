import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import { EtdaTime } from "../../blocks/etad_time_picker/types";
import { GuestVehicleInfo } from "../../blocks/guest_vehicle_info_input_box copy/types";

type RegisterGuestVehicleScreenProps = NativeStackScreenProps<VillifeStackParamList, "register_guest_vehicle">;

export type GuestVehicle = GuestVehicleInfo &
    EtdaTime & {
        model: string;
    };

export default RegisterGuestVehicleScreenProps;
