import { SetterOrUpdater, useRecoilState } from "recoil";
import useUserInformation from "../../../common/hooks/service/user_info";
import { requestedVehiclesState, vehiclesState } from "./states";
import ViewModelCommmon from "../../../common/model/absc";

import StardustDateParser from "../../../../libs/date_parser";
import { RequestedVehicle, Vehicle, VehicleETDAUpdateForm, VehicleOwnerType, VehicleRegistrationForm } from "./types";
import { UserInfo } from "../../../common/hooks/service/user_info/types";
import { TimePickerTime } from "../../../common/atoms/time_picker/types";
import { Villife } from "@team-stardusts/villife-client";

export default function useParkingViewmodel() {
    const user = useUserInformation() as UserInfo;
    const [vehicles, setVehicles] = useRecoilState(vehiclesState);
    const [requestedVehicles, setRequestedVehicles] = useRecoilState(requestedVehiclesState);

    class ParkingViewModel extends ViewModelCommmon<Vehicle[]> {
        private _api: Villife.Parking.Client;

        constructor(user: UserInfo, data: Vehicle[], setData: SetterOrUpdater<Vehicle[]>) {
            super(user, "parking", data, setData);
            this._api = this._clientInstance.parking;
        }

        get requestedVehicles(): RequestedVehicle[] {
            return requestedVehicles;
        }

        public override async update(): Promise<void> {
            let buildingId: number | undefined;

            if (this._user?.isRenter) buildingId = this._user.buildingID;
            else buildingId = this._user?.adminInfomation?.selectedBuilding.id;

            if (buildingId === undefined) return;

            const tenants: Vehicle[] = await this._api
                .getVehicles(buildingId)
                .then((r) => {
                    if (!(r instanceof Array)) {
                        console.error("PARKING_VIEWMODEL_TENANT", r);
                        return [];
                    }

                    return r.map((v) => {
                        let ownerType: VehicleOwnerType = "tenant";
                        if (v.roomNumber === user?.roomNumber) {
                            ownerType = "user";
                        }

                        return this.toViewModel(ownerType, v);
                    });
                })
                .catch((err) => {
                    console.log("[PARKING]", err);
                    return [];
                });

            const guests = await this._api
                .getGuestVehicles(buildingId)
                .then((r) => r.map((v) => this.toViewModel("guest", v)))
                .catch((err) => {
                    console.log("[PARKING_GUEST]", err);
                    return [];
                });

            const _vehicles = this.sortVehicles([...tenants, ...guests]);

            if (_vehicles.length === 0) {
                await this.restore()
                    .then((r) => {
                        if (r !== null) {
                            this.save(
                                r.map((v) => {
                                    const _v = v;
                                    _v.eta = new Date(v.eta);
                                    _v.etd = new Date(v.etd);
                                    return _v;
                                })
                            );
                        }
                    })
                    .catch((err) => {
                        console.error("[PARKING_VIEWMODEL]", "[GET_ITEMS]", err);
                    });

                return;
            }

            await this.save(_vehicles);

            if (user?.isRenter) {
                await this._clientInstance.approval.checkUserIsWaitingForApproval<RequestedVehicle>(2, 1).then((r) => {
                    if (r === undefined) return;
                    setRequestedVehicles(r.map((v) => v.content));
                });
            }
        }

        public convertUserVehicleTime(time: TimePickerTime): Date {
            let stdDate = new Date("8888-12-31");

            return StardustDateParser.changeTime(
                stdDate,
                { hours: time.hour as number, min: time.minute as number },
                "kr"
            );
        }

        public async deleteVehicle(type: VehicleOwnerType, vehicleId: number): Promise<boolean> {
            let result;

            if (type === "guest") {
                result = this._api.deleteGuestVehicle(vehicleId);
            } else {
                result = this._api.deleteUserVehicle(vehicleId);
            }

            return result
                .then(async () => {
                    const _vehicles = this.data.filter((v) => v.id !== vehicleId);
                    await this.save(_vehicles);

                    return true;
                })
                .catch((err) => {
                    console.error("[PARKING_VIEWMODEL]", err);
                    return false;
                });
        }

        public async registerVehicle(params: VehicleRegistrationForm): Promise<boolean> {
            const { ownerType, ...others } = params;

            const _params = {
                ...others,
                eta: StardustDateParser.serialize(params.eta),
                etd: StardustDateParser.serialize(params.etd),
            };

            let result;

            if (ownerType === "user") {
                result = this._api.registerUserVehicle(_params as Villife.Parking.VehicleRegistrationForm);
            } else {
                result = this._api.registerGuestVehicle(_params as Villife.Parking.GuestVehicleRegistrationForm);
            }

            return result
                .then(async (r) => {
                    if (ownerType === "guest") {
                        const newVehicle = this.toViewModel(ownerType, r as Villife.Parking.GuestVehicle);
                        const _vehicles = this.sortVehicles([...this.data, newVehicle]);
                        await this.save(_vehicles);

                        return true;
                    } else {
                        return true;
                    }
                })
                .catch((err) => {
                    console.error("[PARKING_VIEWMODEL]", err);
                    return false;
                });
        }

        public async sendNotification(params: Villife.Parking.NotificationForm): Promise<boolean> {
            return this._api
                .sendPushNotification(params)
                .then(() => true)
                .catch((err) => {
                    console.error("[PARKING_VIEWMODEL]", err);
                    return false;
                });
        }

        public async updateUserVehilceETDA(params: VehicleETDAUpdateForm): Promise<boolean> {
            const eta: Date = this.convertUserVehicleTime(params.etda.eta);
            const etd: Date = this.convertUserVehicleTime(params.etda.etd);

            const _params = {
                ...params,
                eta: StardustDateParser.serialize(eta),
                etd: StardustDateParser.serialize(etd),
            };

            return this._api
                .updateUserVehicleETDA(_params)
                .then(async () => {
                    const vehicles = this.data;
                    const index = vehicles.findIndex((v) => v.id === params.vehicleId);

                    if (index === -1) return false;
                    vehicles[index].eta = eta;
                    vehicles[index].etd = etd;

                    await this.save(vehicles);

                    return true;
                })
                .catch((err) => {
                    console.error("[PARKING_VIEWMODEL]", err);
                    return false;
                });
        }

        public async updateUserVehilceInfo(params: Villife.Parking.VehicleInfoUpdateForm): Promise<boolean> {
            return this._api
                .updateUserVehicleInfo(params)
                .then(async () => {
                    const vehicles = this.data;
                    const index = vehicles.findIndex((v) => v.id === params.vehicleId);

                    if (index === -1) return false;
                    vehicles[index].model = params.model;
                    vehicles[index].plateNumber = params.plateNumber;

                    await this.save(vehicles);

                    return true;
                })
                .catch((err) => {
                    console.error("[PARKING_VIEWMODEL]", err);
                    return false;
                });
        }

        private toViewModel(
            type: VehicleOwnerType,
            vehicle: Villife.Parking.GuestVehicle | Villife.Parking.TenantVehicle
        ): Vehicle {
            const _vehicle: any = vehicle;
            _vehicle.ownerType = type;
            _vehicle.eta = StardustDateParser.deserialize(vehicle.eta);
            _vehicle.etd = StardustDateParser.deserialize(vehicle.etd);

            return _vehicle;
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

    return new ParkingViewModel(user, vehicles, setVehicles);
}
