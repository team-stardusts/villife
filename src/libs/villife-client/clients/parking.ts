import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifeParkingClient extends VillifeClientCommon implements Villife.Parking.Client {
    /**
     * Delete a vehicle of the guest.
     * @param vehicleId
     * @returns
     */
    public async deleteGuestVehicle(vehicleId: number): Promise<string> {
        return await this.requestWithCredential({
            method: "delete",
            url: this._routes.parking.handleGuestVehicle,
            params: {
                vehicleId,
            },
        });
    }

    /**
     * Delete a vehicle of the user.
     * @param vehicleId
     * @returns
     */
    public async deleteUserVehicle(vehicleId: number): Promise<string> {
        return await this.requestWithCredential({
            method: "delete",
            url: this._routes.parking.handleVechile,
            params: {
                vehicleId,
            },
        });
    }

    /**
     * Get guest vehicles of a building.
     * @param {string} buildingId
     * @returns {Villife.Parking.GuestVehicle}
     */
    public async getGuestVehicles(buildingId: number): Promise<Villife.Parking.GuestVehicle[]> {
        return await this.requestWithCredential({
            method: "get",
            url: this._routes.parking.handleGuestVehicle,
            params: {
                buildingId,
            },
        });
    }

    /**
     * Get vehicles of a user.
     */
    public async getUserVehicles(): Promise<Villife.Parking.TenantVehicle[]> {
        return await this.requestWithCredential({
            method: "get",
            url: this._routes.parking.handleVechile,
        });
    }

    /**
     * Get a building's vehicles.
     * @param buildingId
     * @returns
     */
    public async getVehicles(buildingId: number): Promise<Villife.Parking.TenantVehicle[]> {
        return await this.requestWithCredential({
            method: "get",
            url: this._routes.parking.handleVechile,
            params: {
                buildingId,
            },
        });
    }

    /**
     * Register the guest vehicle in the building.
     * @param params
     * @returns
     */
    public async registerGuestVehicle(
        params: Villife.Parking.GuestVehicleRegistrationForm
    ): Promise<Villife.Parking.GuestVehicle> {
        return await this.requestWithCredential({
            method: "post",
            url: this._routes.parking.handleGuestVehicle,
            data: params,
        });
    }

    /**
     * Register the user vehicle in the building.
     * @param params
     * @returns
     */
    public async registerUserVehicle(
        params: Villife.Parking.VehicleRegistrationForm
    ): Promise<Villife.Parking.TenantVehicle> {
        return await this.requestWithCredential({
            method: "post",
            url: this._routes.approval.registerUserVehicle,
            data: params,
        });
    }

    /**
     * Send notification to user.
     * @param params
     * @returns
     */
    public async sendPushNotification(params: Villife.Parking.NotificationForm): Promise<string> {
        return await this.requestWithCredential({
            method: "post",
            url: this._routes.parking.sendPushNotification,
            data: params,
        });
    }

    /**
     * Update ETA, ETD time of the user vehicle.
     * @param params
     * @returns
     */
    public async updateUserVehicleETDA(params: Villife.Parking.VehicleETDAUpdateForm): Promise<string> {
        return await this.requestWithCredential({
            method: "patch",
            url: this._routes.parking.updateParkInformation,
            data: params,
        });
    }

    /**
     * Update user vehicle information.
     * @param params
     * @returns
     */
    public async updateUserVehicleInfo(params: Villife.Parking.VehicleInfoUpdateForm): Promise<string> {
        return await this.requestWithCredential({
            method: "patch",
            url: this._routes.parking.handleVechile,
            data: params,
        });
    }
}

export default VillifeParkingClient;
