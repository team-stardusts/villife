import { Response, ResponseForTest } from "../../types";

interface VehicleGettable {
    getMyVehicles(): Response<TenantVehicle[]>;
    getBuildingRegistedVehicles(): Response<TenantVehicle[]>;
    getBuildingGuestVehicles(): Response<GuestVehicle[]>;
}

interface TestVehicleGettable {
    getMyVehicles(): ResponseForTest<TenantVehicle[]>;
    getBuildingRegistedVehicles(): ResponseForTest<TenantVehicle[]>;
    getBuildingGuestVehicles(): ResponseForTest<GuestVehicle[]>;
}

type VehicleType = "4WD" | "2WD";

export type TenantVehicle = {
    id: number;
    room_number: number;
    phone_number: string;
    model: string;
    plate_number: string;
    etd: number;
    eta: number;
    vehicle_type: VehicleType;
};

export type GuestVehicle = TenantVehicle & {
    visiting_perpose: string;
};

// [TO-DO] 서버 API 적용 완료 후 Test interface 변경
export default interface IVillifeParkingManager extends TestVehicleGettable {}
