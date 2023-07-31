import { Vehicle } from "../../../services/states/types";
import useVehicleListStyles from "./styles";

export type VehicleListHeaderViewProps = {
    styles: ReturnType<typeof useVehicleListStyles>["header"];
};

export type VehicleListBodyViewProps = {
    styles: ReturnType<typeof useVehicleListStyles>["body"];
    vehicles: Vehicle[];
};
