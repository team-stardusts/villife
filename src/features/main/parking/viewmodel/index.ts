import { SetterOrUpdater, useRecoilState } from "recoil";
import useUserInformation from "../../../common/hooks/service/user_info";
import vehiclesState, { Vehicle } from "./states";
import ViewModelCommmon from "../../../common/model/absc";
import Villife from "../../../../libs/villife-client/types";
import { UserInfo } from "../../../common/hooks/service/user_info/types";
import StardustDateParser from "../../../../libs/date_parser";

export default function useParkingViewmodel() {
    const user = useUserInformation();
    const [vehicles, setVehicles] = useRecoilState(vehiclesState);

    if (user === null) return null;

    class ParkingViewModel extends ViewModelCommmon<Vehicle[]> {
        private _api: Villife.Parking.Client;
        protected _data: Vehicle[] = vehicles;
        protected _setData: SetterOrUpdater<Vehicle[]> = setVehicles;
        public readonly feature: string = "parking";

        constructor(user: UserInfo) {
            super(user);
            this._api = this._clientInstance.parking;
        }

        public override async update(): Promise<void> {
            let buildingId: number | undefined;

            if (this._user.isRenter) buildingId = this._user.buildingID;
            else buildingId = this._user.adminInfomation?.selectedBuilding.id;

            if (buildingId === undefined) return;

            const tenants: Vehicle[] = await this._api
                .getVehicles(buildingId)
                .then((r) => {
                    const _vehicles: Vehicle[] = [];
                    for (let vehicle of r) {
                        const _vehicle: any = vehicle;
                        if (vehicle.roomNumber === user?.roomNumber) {
                            _vehicle.ownerType = "user";
                        } else {
                            _vehicle.ownerType = "tenant";
                        }
                        _vehicle.eta = StardustDateParser.deserialize(vehicle.eta);
                        _vehicle.etd = StardustDateParser.deserialize(vehicle.etd);

                        _vehicles.push(_vehicle);
                    }
                    return _vehicles;
                })
                .catch((err) => {
                    console.log("[PARKING]", err);
                    return [];
                });
            const guests = await this._api
                .getGuestVehicles(buildingId)
                .then((r) => {
                    const _vehicles: Vehicle[] = [];
                    for (let vehicle of r) {
                        const _vehicle: any = vehicle;
                        _vehicle.ownerType = "guest";
                        _vehicle.eta = StardustDateParser.deserialize(vehicle.eta);
                        _vehicle.etd = StardustDateParser.deserialize(vehicle.etd);

                        _vehicles.push(_vehicle);
                    }
                    return _vehicles;
                })
                .catch((err) => {
                    console.log("[PARKING_GUEST]", err);
                    return [];
                });
            const _vehciles = this.sortVehicles([...tenants, ...guests]);

            if (_vehciles.length === 0) {
                const storedVehicles = await this._storage.getItem();

                storedVehicles !== null && setVehicles([...storedVehicles]);

                return;
            }

            await this._storage.setItem(_vehciles);
            setVehicles(_vehciles);
        }

        private sortVehicles(targetVehicles: Vehicle[]): Vehicle[] {
            // 차량번호 1 -> 2
            return (
                targetVehicles
                    .sort((vehicleA, vehicleB) => {
                        try {
                            let _vehicleANumber = vehicleA.plateNumber.split(" ")[0];
                            let _vehicleBNumber = vehicleB.plateNumber.split(" ")[0];

                            _vehicleANumber = _vehicleANumber.slice(0, _vehicleANumber.length - 1);
                            _vehicleBNumber = _vehicleBNumber.slice(0, _vehicleBNumber.length - 1);

                            return parseInt(_vehicleANumber) - parseInt(_vehicleBNumber);
                        } catch {
                            return 0;
                        }
                    })
                    // Room number 오름차순
                    .sort((vehicleA, vehicleB) => {
                        return vehicleA.roomNumber - vehicleB.roomNumber;
                    })
                    // 방문자 -> 거주자
                    .sort((vehicleA, vehicleB) => {
                        if (vehicleA.ownerType === vehicleB.ownerType) {
                            return 0;
                        } else if (vehicleA.ownerType === "guest" && vehicleB.ownerType !== "guest") {
                            return -1;
                        }

                        return 1;
                    })
            );
        }
    }

    return new ParkingViewModel(user);
}
