import { Vehicle } from "../../services/states/types";
import { EtdaTime } from "../etad_time_picker/types";

export type VehicleModifyModalProps = {
    initialVehicleInfo: Vehicle;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    //updateVehicleEtda: ParkServiceReturns["updateUserVehicleEtda"];
    //updateVehicleInfo: ParkServiceReturns["updateUserVehicleInfo"];
};

export type Page = "etda" | "info";

export type Info = {
    model: string;
    plateNumber: string;
};

export type EtdaPageProps = {
    initialEtda: EtdaTime;
    onChangeData(etda: EtdaTime): void;
    onToInfoPageBtnPress(): void;
};

export type InfoPageProps = {
    initialVehicleInfo: VehicleModifyModalProps["initialVehicleInfo"];
    onChangeData(info: Info): void;
};
