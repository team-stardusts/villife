import { EtdaTime } from "../../etad_time_picker/types";
import { VehicleInfo } from "../../../screens/register_vehicle/blocks/input_box/types";
import useVehicleModifyModalStyles from "./styles";
import { Vehicle } from "../../../viewmodel/types";
import useParkingViewmodel from "../../../viewmodel";

export type VehicleModifyModalProps = {
    modifyType: VehicleModifyType;
    vehilce: Vehicle;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    viewModel: ReturnType<typeof useParkingViewmodel>;
};

export type VehicleModifyType = "etda" | "info";

export type EtdaEditViewProps = {
    styles: ReturnType<typeof useVehicleModifyModalStyles>;
    initialEtda: EtdaTime;
    onChangeEtda(data: EtdaTime): void;
};

export type InfoEditViewProps = {
    styles: ReturnType<typeof useVehicleModifyModalStyles>;
    initialnfo: VehicleInfo;
    onChangeInfo(data: VehicleInfo): void;
};
