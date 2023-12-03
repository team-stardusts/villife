import StardustDateParser from "../../../../../../libs/date_parser";
import { Responsable } from "../../../../../../libs/rest_apis/types";
import VillifeServer from "../../../../../../libs/rest_apis/villife";
import { Parking } from "../../../../../../libs/rest_apis/villife/parking/types";
import { Vehicle, VehicleOwnerType } from "../../states/types";
import type {
    IParkingServiceProvider,
    MyVehicleEtdaUpdateParams,
    MyVehicleInfoUpdateParams,
    RegisterGuestVehicleParams,
    RegisterUserVehicleParams,
    SendMessageParams,
    DeleteVehicleParams,
} from "./types";

class ParkingServiceProvider implements IParkingServiceProvider {
    private _api = VillifeServer.getParkingManager();

    public async getVehicles(ownerType: VehicleOwnerType, buildingID?: number | undefined): Promise<Vehicle[]> {
        if ((ownerType === "tenant" || ownerType === "guest") && !buildingID) {
            throw Error("[PARK_SERVICE] A Building ID is required to get a list of resident vehicles.");
        }

        let result = null;

        switch (ownerType) {
            case "user":
                result = await this._api.getVehicles();
                break;
            case "tenant":
                result = await this._api.getVehicles(buildingID as number);
                break;
            case "guest":
                result = await this._api.getGuestVehiclesOfBuilding(buildingID as number);
                break;
        }

        let vehicles: Vehicle[] = [];

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, `Failed to get ${ownerType} vehicle list.`);

            return vehicles;
        }

        for (let i = 0; i < result.data.data.length; i++) {
            vehicles.push({
                ...result.data.data[i],
                ownerType: ownerType,
                eta: StardustDateParser.deserialize(result.data.data[i].eta),
                etd: StardustDateParser.deserialize(result.data.data[i].etd),
            });
        }

        return vehicles;
    }

    public async updateUserVehicleETDA(params: MyVehicleEtdaUpdateParams): Promise<boolean> {
        console.log(params.etda);

        let stdDate = new Date("8888-12-31");

        const etd: Date = StardustDateParser.changeTime(
            stdDate,
            { hours: params.etda.etd.hour as number, min: params.etda.etd.minute as number },
            "kr"
        );

        const eta: Date = StardustDateParser.changeTime(
            stdDate,
            { hours: params.etda.eta.hour as number, min: params.etda.eta.minute as number },
            "kr"
        );

        const _params = {
            vehicleID: params.vehicleID,
            etd: StardustDateParser.serialize(etd),
            eta: StardustDateParser.serialize(eta),
        };

        return (await this._api.updateUserVehicleEtda(_params)).isSuccessful;
    }

    public async updateUserVehicleInfo(params: MyVehicleInfoUpdateParams): Promise<boolean> {
        return (await this._api.updateUserVehicleInfo(params)).isSuccessful;
    }

    public async registerUserVehicle(params: RegisterUserVehicleParams): Promise<Vehicle | null> {
        const _params = {
            ...params,
            eta: StardustDateParser.serialize(new Date(`8888-12-31T${params.eta.hour}:${params.eta.minute}`)),
            etd: StardustDateParser.serialize(new Date(`8888-12-31T${params.etd.hour}:${params.etd.minute}`)),
        };

        const result = await this._api.registerUserVehicle(_params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "User's vehicle registration failed.");

            return null;
        }

        return this.convertVehicleToUseableVehicle("user", result.data.data);
    }

    public async registerGuestVehicle(params: RegisterGuestVehicleParams): Promise<Vehicle | null> {
        const result = await this._api.registerGuestVehicleToBuilding(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "Guest's vehicle registration failed.");

            return null;
        }

        return this.convertVehicleToUseableVehicle("guest", result.data.data);
    }

    public async sendMessage(params: SendMessageParams): Promise<boolean> {
        const result = await this._api.sendPushNotification(params);

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, `Failed to send message to the vehicle number ${params.vehicleID}.`);

            return false;
        }

        return true;
    }

    public async deleteVehicle(params: DeleteVehicleParams): Promise<boolean> {
        let result = null;

        if (params.type === "user") {
            result = await this._api.deleteUserVehicle(params.vehicleID);
        } else {
            result = await this._api.deleteGuestVehicle(params.vehicleID);
        }

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, `Failed to delete ${params.type} vehicle.`);

            return false;
        }

        return true;
    }

    private convertVehicleToUseableVehicle(
        ownerType: VehicleOwnerType,
        vehicle: Parking.GuestVehicle | Parking.TenantVehicle
    ): Vehicle {
        return {
            ...vehicle,
            ownerType: ownerType,
            eta: StardustDateParser.deserialize(vehicle.eta),
            etd: StardustDateParser.deserialize(vehicle.etd),
        };
    }

    private printWhyFailed(response: Responsable<any>["data"], message?: string) {
        console.error("[PARKING_SERVICE]", response?.status, message && message, `\n\tReason: ${response?.data}`);
    }
}

export default ParkingServiceProvider;
