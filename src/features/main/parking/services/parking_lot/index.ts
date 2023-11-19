import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { useRecoilState } from "recoil";
import { Vehicle, VehicleOwnerType } from "../states/types";
import { vehiclesRequestedState, vehiclesState } from "../states";
import useUserInformation from "../../../../common/hooks/service/user_info";
import ParkingServiceProvider from "./service";
import type {
    DeleteVehicleParams,
    IParkingServiceProvider,
    MyVehicleEtdaUpdateParams,
    MyVehicleInfoUpdateParams,
    RegisterGuestVehicleParams,
    RegisterUserVehicleParams,
} from "./service/types";
import type { IParkingLot, ParkingLotRegisterUserVehicleParams } from "./types";
import { useCallback, useEffect, useState } from "react";
import VillifeStorage from "../../../../../libs/storage";
import { RequestedVehicleData } from "../../../../../libs/storage/tables/vehicle/types";

export default function useParkingLot(): IParkingLot {
    const [vehicles, setVehicles] = useRecoilState<Vehicle[]>(vehiclesState);
    const [requestedVehicles, setRequestedVehicles] = useRecoilState<RequestedVehicleData[]>(vehiclesRequestedState);
    const user = useUserInformation();
    const service: IParkingServiceProvider = new ParkingServiceProvider();
    const storage = VillifeStorage.getInstance();

    const extractVehiclesApprovedNotYet = (requestedVehiclesInStorage: RequestedVehicleData[], vehciles: Vehicle[]) => {
        // 디버깅을 해도 requestedVehiclesInStorage가 undefined인 경우를 찾을 수 없었지만
        // Reload 되는 타이밍에 쓰레기 값이 들어가는게 아닌가 하는 추측으로 Undefined 검사 코드를 추가함

        const filtered = requestedVehiclesInStorage?.filter(
            (x) => !vehciles.find((y) => x.roomNumber === user?.roomNumber && x.plateNumber === y.plate_number)
        );
        return filtered === undefined ? [] : filtered;
    };

    class ParkingLot implements IParkingLot {
        public readonly vehicles: Vehicle[] = vehicles;

        get userVehicles(): Vehicle[] {
            return vehicles.filter((vehicle) => vehicle.ownerType === "user");
        }

        get userVehiclesNotRegisted(): RequestedVehicleData[] {
            /* if (requestedVehicles.length === 0) {
                storage.vehicle.requetedTobeRegisted.get().then((r) => {
                    const storedData = r === null ? [] : r;
                    setRequestedVehicles(storedData);
                });
            }
 */
            return requestedVehicles;
        }

        get guestVehicles(): Vehicle[] {
            return vehicles.filter((vehicle) => vehicle.ownerType === "guest");
        }

        get tenantVehicles(): Vehicle[] {
            return vehicles.filter((vehicle) => vehicle.ownerType === "tenant");
        }

        public async updateVehicles(ownerType?: VehicleOwnerType): Promise<void> {
            const requestedVehicles = await storage.vehicle.requetedTobeRegisted.get().then((r) => {
                const storedData = r === null ? [] : r;
                return storedData;
            });

            if (ownerType !== undefined) {
                if (ownerType === "user" && user?.isAdmin) return;

                const newData = [
                    ...vehicles.filter((vehicle) => vehicle.ownerType !== ownerType),
                    ...(await service.getVehicles(ownerType)),
                ];

                setVehicles([...newData]);

                return;
            }

            const newVehicles: Vehicle[] = [];
            const buildingID = user?.isAdmin ? user?.adminInfomation?.selectedBuilding.id : user?.buildingID;

            if (buildingID === undefined) {
                console.log("[PARKING_LOT]:", "There are no building ID in user information.");
                return;
            }

            if (!user?.isAdmin) {
                // 유저 차량 리스트 불러오기
                newVehicles.push(...(await service.getVehicles("user")));
            }

            try {
                // 거주자 차량 리스트 불러오기
                // UserVehicles에 있는 Vehicle이 있는 경우 Filtering.
                newVehicles.push(
                    ...(await service.getVehicles("tenant", buildingID)).filter(
                        (vehicle) => !this.userVehicles.map((userVehicle) => userVehicle.id).includes(vehicle.id)
                    )
                );
                // 방문자 차량 리스트 불러오기
                newVehicles.push(...(await service.getVehicles("guest", buildingID)));
            } catch (e) {
                console.log(e);
            }

            const approvedYet = extractVehiclesApprovedNotYet(requestedVehicles, newVehicles);

            await storage.vehicle.requetedTobeRegisted.set(approvedYet);

            setRequestedVehicles(approvedYet);
            setVehicles(newVehicles);
        }

        public async updateUserVehicleEtda(params: MyVehicleEtdaUpdateParams): Promise<boolean> {
            const isSuccessful = await service.updateUserVehicleETDA(params);

            isSuccessful && this.updateVehicles("user");

            return isSuccessful;
        }

        public async updateUserVehicleInfo(params: MyVehicleInfoUpdateParams): Promise<boolean> {
            const isSuccessful = await service.updateUserVehicleInfo(params);

            isSuccessful && this.updateVehicles("user");

            return isSuccessful;
        }

        public async registerUserVehicle(params: ParkingLotRegisterUserVehicleParams): Promise<boolean> {
            if (user?.roomID === undefined) {
                console.error("[PARKING_LOT]", "User doesn't have the room ID.");

                return false;
            }
            const vehicle = await service.registerUserVehicle({
                ...params,
            });

            if (vehicle === null) {
                return false;
            }

            await storage.vehicle.requetedTobeRegisted.set([
                ...requestedVehicles,
                { roomNumber: user.roomNumber, model: params.model, plateNumber: params.plateNumber },
            ]);

            setVehicles([...vehicles, vehicle]);
            return true;
        }

        public async registerGuestVehicle(params: RegisterGuestVehicleParams): Promise<boolean> {
            const vehicle = await service.registerGuestVehicle(params);

            if (vehicle === null) {
                return false;
            }

            setVehicles([...vehicles, vehicle]);
            return true;
        }

        public async deleteVehicle(params: DeleteVehicleParams): Promise<boolean> {
            const isSuccessful = await service.deleteVehicle(params);

            isSuccessful && setVehicles([...vehicles.filter((vehicle) => vehicle.id !== params.vehicleID)]);

            return isSuccessful;
        }

        public async sendMessage(params: Parking.SendPushNotification.Params): Promise<boolean> {
            return await service.sendMessage(params);
        }
    }

    return new ParkingLot();
}
