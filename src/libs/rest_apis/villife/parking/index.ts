import { AxiosRequestConfig } from "axios";
import { Response, ResponseForTest } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeParkingManager, { GuestVehicle, TenantVehicle } from "./types";

const myVehicles: TenantVehicle[] = [
    {
        id: 1,
        room_number: 101,
        phone_number: "010-0000-0000",
        model: "올 뉴 크루즈",
        plate_number: "11가 1111",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
    },
    {
        id: 2,
        room_number: 101,
        phone_number: "010-0000-0000",
        model: "투싼",
        plate_number: "11가 1112",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
    },
];

const tenants: TenantVehicle[] = [
    ...myVehicles,
    {
        id: 3,
        room_number: 102,
        phone_number: "010-1111-1111",
        model: "싼타페",
        plate_number: "22나 2222",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
    },
    {
        id: 4,
        room_number: 201,
        phone_number: "010-2222-2222",
        model: "소나타",
        plate_number: "33다 3333",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
    },
    {
        id: 5,
        room_number: 202,
        phone_number: "010-3333-3333",
        model: "아반떼",
        plate_number: "44라 4444",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
    },
    {
        id: 6,
        room_number: 301,
        phone_number: "010-4444-4444",
        model: "아반떼",
        plate_number: "55마 5555",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
    },
    {
        id: 7,
        room_number: 302,
        phone_number: "010-5555-5555",
        model: "K3",
        plate_number: "66바 6666",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
    },
];

const guests: GuestVehicle[] = [
    {
        id: 1,
        room_number: 102,
        phone_number: "010-6666-6666",
        model: "싼타페",
        plate_number: "77사 7777",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
        visiting_perpose: "Hello!!!",
    },
    {
        id: 2,
        room_number: 201,
        phone_number: "010-7777-7777",
        model: "소나타",
        plate_number: "88아 8888",
        etd: 10293,
        eta: 10293,
        vehicle_type: "4WD",
        visiting_perpose: "World!!!",
    },
];

class VillifeParkginManager extends AVillifeServerModule implements IVillifeParkingManager {
    /**
     * @param getMyVehicles
     * @warn
     */
    public async getMyVehicles(): ResponseForTest<TenantVehicle[]> {
        const route: string = "test";

        /* return await this.requestAuthable<any, TenantVehicle[]>({
            method: "get",
            url: route,
        }); */
        return await this.requestForTest<TenantVehicle[]>(myVehicles);
    }

    /**
     * @param getBuildingRegistedVehicles
     * @warn
     */
    public async getBuildingRegistedVehicles(): ResponseForTest<TenantVehicle[]> {
        const route: string = "test";

        /* return await this.requestAuthable<any, TenantVehicle[]>({
            method: "get",
            url: route,
        }); */

        return await this.requestForTest<TenantVehicle[]>(tenants);
    }

    /**
     * @param getBuildingGuestVehicles
     * @warn
     */
    public async getBuildingGuestVehicles(): ResponseForTest<GuestVehicle[]> {
        const route: string = "test";

        /* return await this.requestAuthable<any, GuestVehicle[]>({
            method: "get",
            url: route,
        }); */
        return await this.requestForTest<GuestVehicle[]>(guests);
    }
}

export default VillifeParkginManager;
