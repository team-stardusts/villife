import { Vehicle } from "../../../services/states/types";
import useVehicleListStyles from "./styles";

export type VehicleListBodyViewProps = {
    styles: ReturnType<typeof useVehicleListStyles>["body"];
    vehicles: Vehicle[];
};

export type VehicleListViewProps = {
    vehicles: Vehicle[];
};
