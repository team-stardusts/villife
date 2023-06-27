import { AxiosRequestConfig } from "axios";
import { Response, ResponseForTest } from "../../types";
import AVillifeServerModule from "../absc";
import IVillifeParkingManager, { Parking } from "./types";

const myVehicles: Parking.TenantVehicle[] = [
    {
        id: 1,
        room_number: 101,
        phone_number: "010-0000-0000",
        model: "올 뉴 크루즈",
        plate_number: "11가 1111",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
    },
    {
        id: 2,
        room_number: 101,
        phone_number: "010-0000-0000",
        model: "투싼",
        plate_number: "11가 1112",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
    },
    {
        id: 8,
        room_number: 101,
        phone_number: "010-0000-0000",
        model: "Benz C",
        plate_number: "99아 9999",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
    },
];

const tenants: Parking.TenantVehicle[] = [
    ...myVehicles,
    {
        id: 3,
        room_number: 102,
        phone_number: "010-1111-1111",
        model: "싼타페",
        plate_number: "22나 2222",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
    },
    {
        id: 4,
        room_number: 201,
        phone_number: "010-2222-2222",
        model: "소나타",
        plate_number: "33다 3333",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
    },
    {
        id: 5,
        room_number: 202,
        phone_number: "010-3333-3333",
        model: "아반떼",
        plate_number: "44라 4444",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
    },
    {
        id: 6,
        room_number: 301,
        phone_number: "010-4444-4444",
        model: "아반떼",
        plate_number: "55마 5555",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
    },
    {
        id: 7,
        room_number: 302,
        phone_number: "010-5555-5555",
        model: "K3",
        plate_number: "66바 6666",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
    },
];

const guests: Parking.GuestVehicle[] = [
    {
        id: 1,
        room_number: 102,
        phone_number: "010-6666-6666",
        model: "싼타페",
        plate_number: "77사 7777",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
        visiting_perpose: "Hello!!!",
    },
    {
        id: 2,
        room_number: 201,
        phone_number: "010-7777-7777",
        model: "소나타",
        plate_number: "88아 8888",
        etd: 253396944000,
        eta: 253396944000,
        vehicle_type: "4WD",
        visiting_perpose: "World!!!",
    },
];

class VillifeParkginManager extends AVillifeServerModule implements IVillifeParkingManager {
    /**
     *
     * @returns
     */
    public async getMyVehicles(): ResponseForTest<Parking.TenantVehicle[]> {
        const route: string = this.routes.parking.handleVechile;

        /* return await this.requestAuthable<any, TenantVehicle[]>({
            method: "get",
            url: route,
        }); */
        return await this.requestForTest<Parking.TenantVehicle[]>(myVehicles);
    }

    /**
     * @param getBuildingRegistedVehicles
     * @warn
     */
    public async getBuildingRegistedVehicles(): ResponseForTest<Parking.TenantVehicle[]> {
        const route: string = "test";

        /* return await this.requestAuthable<any, TenantVehicle[]>({
            method: "get",
            url: route,
        }); */

        return await this.requestForTest<Parking.TenantVehicle[]>(tenants);
    }

    /**
     * @param getBuildingGuestVehicles
     * @warn
     */
    public async getBuildingGuestVehicles(): ResponseForTest<Parking.GuestVehicle[]> {
        const route: string = "test";

        /* return await this.requestAuthable<any, GuestVehicle[]>({
            method: "get",
            url: route,
        }); */
        return await this.requestForTest<Parking.GuestVehicle[]>(guests);
    }

    /**
     *
     * @param params
     * @returns
     */
    public async updateMyVehicleEtda(
        params: Parking.VehicleEtdaUpdateParams
    ): ResponseForTest<Parking.VehicleInfoUpdateReturnType> {
        const route: string = "test";

        const vechiles = (await this.getMyVehicles()).data.data as Parking.TenantVehicle[];

        const vehicleIndexWantToChange = vechiles.findIndex((vehicle) => vehicle.id === params.vehicleID);

        vechiles[vehicleIndexWantToChange].eta = params.eta;
        vechiles[vehicleIndexWantToChange].etd = params.etd;

        return await this.requestForTest<Parking.VehicleInfoUpdateReturnType>("Test");
    }

    /**
     *
     * @param params
     * @returns
     */
    public async updateMyVehicleInfo(
        params: Parking.VehicleInfopdateParams
    ): ResponseForTest<Parking.VehicleInfoUpdateReturnType> {
        const route: string = "test";

        const vechiles = (await this.getMyVehicles()).data.data as Parking.TenantVehicle[];

        const vehicleIndexWantToChange = vechiles.findIndex((vehicle) => vehicle.id === params.vehicleID);

        vechiles[vehicleIndexWantToChange].model = params.model;
        vechiles[vehicleIndexWantToChange].plate_number = params.plateNumber;

        return await this.requestForTest<Parking.VehicleInfoUpdateReturnType>("Test");
    }
}

export default VillifeParkginManager;
