import { Vehicle } from "../../../services/states/types";
import { VehicleModifyType } from "../../../blocks/modal/modify/types";
import useVehicleCardViewStyles from "./styles";

export type VehicleCardViewProps = {
    vehicles: Vehicle[];
};

export type VehicleCardBodyProps = {
    styles: ReturnType<typeof useVehicleCardViewStyles>["body"];
    vehicles: Vehicle[];
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
