import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { useRecoilState } from "recoil";
import { Vehicle, VehicleOwnerType } from "../states/types";
import { vehiclesState } from "../states";
import useUserInformation from "../../../../common/hooks/service/user_info";
import ParkingServiceProvider from "./provider";
import type {
    DeleteVehicleParams,
    IParkingServiceProvider,
    MyVehicleEtdaUpdateParams,
    MyVehicleInfoUpdateParams,
    RegisterGuestVehicleParams,
    RegisterUserVehicleParams,
} from "./provider/types";
import type { IParkingLot } from "./types";

export default function useParkingLot(): IParkingLot {
    const [vehicles, setVehicles] = useRecoilState<Vehicle[]>(vehiclesState);
    const user = useUserInformation();
    const service: IParkingServiceProvider = new ParkingServiceProvider();

    class ParkingLot implements IParkingLot {
        public readonly vehicles: Vehicle[] = vehicles;

        get userVehicles(): Vehicle[] {
            return vehicles.filter((vehicle) => vehicle.ownerType === "user");
        }

        get guestVehicles(): Vehicle[] {
            return vehicles.filter((vehicle) => vehicle.ownerType === "guest");
        }

        get tenantVehicles(): Vehicle[] {
            return vehicles.filter((vehicle) => vehicle.ownerType === "tenant");
        }

        public async updateVehicles(ownerType?: VehicleOwnerType): Promise<void> {
            if (ownerType !== undefined) {
                if (ownerType === "user" && user?.isAdmin) return;

                setVehicles([
                    ...vehicles.filter((vehicle) => vehicle.ownerType !== ownerType),
                    ...(await service.getVehicles(ownerType)),
                ]);

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

        public async registerUserVehicle(params: RegisterUserVehicleParams): Promise<boolean> {
            const vehicle = await service.registerUserVehicle(params);

            if (vehicle === null) {
                return false;
            }

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
