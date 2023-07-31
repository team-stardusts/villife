import { Vehicle } from "../../../services/states/types";
import { VehicleModifyType } from "../../../blocks/modify_modal/types";
import useVehicleCardViewStyles from "./styles";

export type VehicleCardViewProps = {
    vehicles: Vehicle[];
};

export type VehicleCardHeaderProps = {
    numberOfVehicle: number;
    styles: ReturnType<typeof useVehicleCardViewStyles>["header"];
    onIntoEditmode(isEditmode: boolean): void;
};

export type VehicleCardBodyProps = {
    styles: ReturnType<typeof useVehicleCardViewStyles>["body"];
    vehicles: Vehicle[];
    cardWidth: number;
    isEditmode: boolean;
    onFlip(index: number): void;
};

export type VehicleCardBottomProps = {
    styles: ReturnType<typeof useVehicleCardViewStyles>["bottom"];
    length: number;
    currentIndex: number;
};

export type VehicleCardProps = {
    vehicle: Vehicle;
    cardWidth: VehicleCardBodyProps["cardWidth"];
    isEditmode: VehicleCardBodyProps["isEditmode"];
    onPressEditBtn(info: VehicleCardInfoForEdit): void;
};

export type VehicleCardInfoForEdit = {
    modifyType: VehicleModifyType;
    vehicle: Vehicle;
};
