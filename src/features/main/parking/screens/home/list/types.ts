import MultilingualMessage from "../../../../../common/hooks/multilingual";
import { Vehicle } from "../../../viewmodel/types";

import useVehicleListStyles from "./styles";

export type VehicleListViewProps = {
    vehicles: Vehicle[];
};

export type VehicleInfoRowProps = {
    isAdmin: boolean;
    messages: MultilingualMessage["messages"];
    vehicle: Vehicle;
    userRoomNumber: number | undefined;
    styles: ReturnType<typeof useVehicleListStyles>["row"];
};
