import { EventRegister } from "react-native-event-listeners";
import { VillifeStorageEvents } from "../..";
import TableCommon from "../absc";
import { RequestedVehicleData, VehiclesRequestedKey } from "./types";
import { TableUsable } from "../types";

// Vehicle requested to be registered
class VehicleRequestedTable extends TableCommon implements TableUsable<VehiclesRequestedKey, RequestedVehicleData[]> {
    readonly key: VehiclesRequestedKey = "vehicles-requested-to-be-registered";

    public async get(): Promise<RequestedVehicleData[] | null> {
        const result = await this.storage.getItem(this.key);

        EventRegister.emit(VillifeStorageEvents.vehicle.requetedTobeRegisted.GET_VEHICLE_REQUESTED_VALUE, result);

        return result;
    }

    public async set(data: RequestedVehicleData[] | null): Promise<boolean> {
        const result = await this.storage.setItem(this.key, data);

        EventRegister.emit(VillifeStorageEvents.vehicle.requetedTobeRegisted.CHANGE_VEHICLE_REQUESTED_VALUE, data);

        return result;
    }

    public async remove(): Promise<void> {
        await this.storage.removeItem(this.key);

        EventRegister.emit(VillifeStorageEvents.vehicle.requetedTobeRegisted.REMOVE_VEHICLE_REQUESTED_VALUE);
    }
}

export default VehicleRequestedTable;
