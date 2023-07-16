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
     * Get vehicles of a user, or a building's vehicles
     * @param {number} buildingID If this parameter is not entered, return vehicles of user.
     * @returns {Parking.TenantVehicle[]}
     */
    public async getVehicles(buildingID?: number): Response<Parking.TenantVehicle[]> {
        const route: string = this.routes.parking.handleVechile;
        const params: Parking.GetVehiclesRequestParam =
            buildingID === undefined
                ? {}
                : {
                      building_id: buildingID,
                  };

        return await this.requestAuthable<any, Parking.TenantVehicle[]>({
            method: "get",
            url: route,
            params,
        });
    }

    /**
     * Get guest vehicles of a building.
     * @param {number} buildingID
     * @returns {Parking.GuestVehicle[]}
     */
    public async getGuestVehiclesOfBuilding(buildingID: number): Response<Parking.GuestVehicle[]> {
        const route: string = this.routes.parking.handleGuestVehicle;
        const params: Parking.GetGuestVehiclesOfBuildingParam = {
            building_id: buildingID,
        };

        return await this.requestAuthable<any, Parking.GuestVehicle[]>({
            method: "get",
            url: route,
            params,
        });
    }

    /**
     * Update a park information of a vehicle such as eta, etd.
     * @param {Parking.VehicleEtdaUpdateParams} params
     * @returns {Parking.VehicleInfoUpdateReturn}
     */
    public async updateUserVehicleEtda(
        params: Parking.VehicleEtdaUpdateParams
    ): Response<Parking.VehicleInfoUpdateReturn> {
        const route: string = this.routes.parking.updateParkInformation;
        const data: Parking.UpdateUserVehicleEtdaBody = {
            eta: params.eta,
            etd: params.etd,
            vehicle_id: params.vehicleID,
        };

        return await this.requestAuthable<Parking.UpdateUserVehicleEtdaBody, Parking.VehicleInfoUpdateReturn>({
            method: "patch",
            url: route,
            data,
        });
    }

    /**
     * Update a vehicle information such as model, plate number.
     * @param {Parking.VehicleInfopdateParams} params
     * @returns {Parking.VehicleInfoUpdateReturn}
     */
    public async updateUserVehicleInfo(
        params: Parking.VehicleInfopdateParams
    ): Response<Parking.VehicleInfoUpdateReturn> {
        const route: string = this.routes.parking.handleVechile;
        const data: Parking.UpdateUserVehicleInfoBody = {
            model: params.model,
            plate_number: params.plateNumber,
            vehicle_id: params.vehicleID,
        };

        return await this.requestAuthable<Parking.UpdateUserVehicleInfoBody, Parking.VehicleInfoUpdateReturn>({
            method: "patch",
            url: route,
            data,
        });
    }

    public async registerGuestVehicleToBuilding(
        params: Parking.RegisterGuestVehicleToBuildingParams
    ): Response<Parking.GuestVehicle> {
        const route: string = this.routes.parking.handleGuestVehicle;
        const data: Parking.RegisterGuestVehicleToBuildingBody = {
            eta: params.eta,
            etd: params.etd,
            guest_phone_number: params.guestPhoneNumber,
            model: params.model,
            plate_number: params.plateNumber,
            vehicle_type: params.vehicleType,
            visiting_purpose: params.visitingPurpose,
        };

        return await this.requestAuthable<Parking.RegisterGuestVehicleToBuildingBody, Parking.GuestVehicle>({
            method: "post",
            url: route,
            data,
        });
    }

    public async registerUserVehicle(params: Parking.RegisterUserVehicle.Params): Response<Parking.TenantVehicle> {
        const route: string = this.routes.approval.registerUserVehicle;
        const data: Parking.RegisterUserVehicle.Body = {
            eta: params.eta,
            etd: params.etd,
            model: params.model,
            plate_number: params.plateNumber,
            vehicle_type: params.vehicleType,
        };

        return await this.requestAuthable<Parking.RegisterUserVehicle.Body, Parking.TenantVehicle>({
            method: "post",
            url: route,
            data,
        });
    }

    public async sendPushNotification(
        params: Parking.SendPushNotification.Params
    ): Response<Parking.SendPushNotification.Return> {
        const route: string = this.routes.parking.sendPushNotification;
        const data: Parking.SendPushNotification.Body = {
            vehicle_id: params.vehicleID,
            ...params,
        };

        return await this.requestAuthable<Parking.SendPushNotification.Body, Parking.SendPushNotification.Return>({
            method: "post",
            url: route,
            data,
        });
    }
}

export default VillifeParkginManager;
