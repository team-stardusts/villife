import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { VillifeStackParamList } from "../../../../common/router/types";
import type { EtdaTime } from "../../blocks/etad_time_picker/types";
import type { GuestVehicleInfo } from "../../blocks/guest_vehicle_info_input_box copy/types";

type RegisterGuestVehicleScreenProps = NativeStackScreenProps<VillifeStackParamList, "register_guest_vehicle">;

export type GuestVehicle = GuestVehicleInfo & {
    model: string;
};

export default RegisterGuestVehicleScreenProps;
