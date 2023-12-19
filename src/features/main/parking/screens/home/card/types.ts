import { VehicleModifyType } from "../../../blocks/modal/modify/types";
import useVehicleCardViewStyles from "./styles";
import { RequestedVehicle, Vehicle } from "../../../viewmodel/types";
import useParkingViewmodel from "../../../viewmodel";

export type VehicleCardViewProps = {
    vehicles: Vehicle[];
    requestedVehicles: RequestedVehicle[];
    viewModel: ReturnType<typeof useParkingViewmodel>;
};

export type VehicleCardBodyProps = {
    styles: ReturnType<typeof useVehicleCardViewStyles>["body"];
    vehicles: Vehicle[];
    requestedVehicles: RequestedVehicle[];
    onFlip(index: number): void;
};

export type VehicleCardBottomProps = {
    styles: ReturnType<typeof useVehicleCardViewStyles>["bottom"];
    length: number;
    currentIndex: number;
};

export type VehicleCardProps = {
    vehicle: Vehicle;
    cardWidth: number;
};

export type EditBtnComboProps = {
    styles: ReturnType<typeof useVehicleCardViewStyles>["btncombo"];
    onPressEditBtn(info: VehicleModifyType): void;
};
