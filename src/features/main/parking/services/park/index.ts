import VillifeServer from "../../../../../libs/rest_apis/villife";
import IVillifeParkingManager, { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { MyVehicleEtdaUpdateServiceParams, ParkServiceReturns, RegisterUserVehicleParams } from "./types";
import { useRecoilState } from "recoil";
import { Vehicle, VehicleOwnerType } from "../states/types";
import { vehiclesState } from "../states";
import { useEffect } from "react";
import StardustDateParser from "../../../../../libs/date_parser";
import useUserInfoService from "../../../../common/hooks/service/user_info";

export default function useParkService(): ParkServiceReturns {
    const [vehicles, setVehicles] = useRecoilState<Vehicle[]>(vehiclesState);
    const user = useUserInfoService();
    const parkManager: IVillifeParkingManager = VillifeServer.getParkingManager();

    /* useEffect(() => {
        updateVehicles();
    }, []); */

    useEffect(() => {
        if (user.adminInfo === null) return;
        if (user.adminInfo?.selectedBuilding === undefined) return;

        updateVehicles();
    }, [user.adminInfo?.selectedBuilding]);

    const updateVehicles = async (ownerType?: VehicleOwnerType) => {
        const newVehicles: Vehicle[] = [];

        if (ownerType === undefined || (!user.isAdmin() && ownerType === "user")) {
            newVehicles.push(...(await getVehiclesByOwnerType("user")));
        } else {
            newVehicles.push(...vehicles.filter((vehicle) => vehicle.ownerType === "user"));
        }

        if (ownerType === undefined || ownerType === "tenant") {
            newVehicles.push(...(await getVehiclesByOwnerType("tenant")));
        } else {
            newVehicles.push(...vehicles.filter((vehicle) => vehicle.ownerType === "tenant"));
        }

        if (ownerType === undefined || ownerType === "guest") {
            newVehicles.push(...(await getVehiclesByOwnerType("guest")));
        } else {
            newVehicles.push(...vehicles.filter((vehicle) => vehicle.ownerType === "guest"));
        }

        setVehicles(newVehicles);
    };

    const getVehiclesByOwnerType = async (ownerType: VehicleOwnerType): Promise<Vehicle[]> => {
        let result = null;

        const buildingID = user.isAdmin() ? user.adminInfo?.selectedBuilding.id : user.basicInfo?.building_id;

        if (buildingID === undefined) {
            console.log("ParkingService:", "There are no building ID in user information.");
            return [];
        }

        switch (ownerType) {
            case "user":
                result = await parkManager.getVehicles();
                break;

            case "tenant":
                result = await parkManager.getVehicles(buildingID);
                break;

            case "guest":
                result = await parkManager.getGuestVehiclesOfBuilding(buildingID);
                break;
        }

        if (!result.isSuccessful || result.data?.data === undefined) {
            console.log(
                "[PARKING_SERVICE]",
                `Received an unexpected return while retrieving vehicle list of ${ownerType} vehicles.`
            );
            return [];
        }

        if (result.data.data.length > 0) {
            const dataArray: Vehicle[] = [];

            for (let i = 0; i < result.data.data.length; i++) {
                dataArray.push({
                    ...result.data.data[i],
                    ownerType: ownerType,
                    eta: StardustDateParser.deserialize(result.data.data[i].eta),
                    etd: StardustDateParser.deserialize(result.data.data[i].etd),
                });
            }

            return dataArray;
        }

        return [];
    };

    const updateUserVehicleEtda = async (params: MyVehicleEtdaUpdateServiceParams): Promise<boolean> => {
        const _params = {
            vehicleID: params.vehicleID,
            etd: StardustDateParser.serialize(new Date(`9999-12-31T${params.etda.etd.hour}:${params.etda.etd.minute}`)),
            eta: StardustDateParser.serialize(new Date(`9999-12-31T${params.etda.eta.hour}:${params.etda.eta.minute}`)),
        };

        const isSuccessful: boolean = (await parkManager.updateUserVehicleEtda(_params)).isSuccessful;

        isSuccessful && updateVehicles("user");

        return isSuccessful;
    };

    const updateUserVehicleInfo = async (params: Parking.VehicleInfopdateParams): Promise<boolean> => {
        const isSuccessful: boolean = (await parkManager.updateUserVehicleInfo(params)).isSuccessful;

        isSuccessful && updateVehicles("user");

        return isSuccessful;
    };

    const registerGuestVehicleToBuilding = async (
        params: Parking.RegisterGuestVehicleToBuildingParams
    ): Promise<boolean> => {
        const result = await parkManager.registerGuestVehicleToBuilding(params);

        if (result.isSuccessful && result.data?.data !== undefined) {
            setVehicles([
                ...vehicles,
                {
                    ...result.data.data,
                    ownerType: "guest",
                    eta: StardustDateParser.deserialize(result.data.data.eta),
                    etd: StardustDateParser.deserialize(result.data.data.etd),
                },
            ]);

            return true;
        }

        return false;
    };

    const registerUserVehicle = async (params: RegisterUserVehicleParams): Promise<boolean> => {
        const DEFAULT_DATE = "9999-12-31";
        const dateOfETA = new Date(`${DEFAULT_DATE}T${params.eta.hour}:${params.eta.minute}`);
        const dateOfETD = new Date(`${DEFAULT_DATE}T${params.etd.hour}:${params.etd.minute}`);

        const result = await parkManager.registerUserVehicle({
            ...params,
            eta: StardustDateParser.serialize(dateOfETA),
            etd: StardustDateParser.serialize(dateOfETD),
        });

        if (result.isSuccessful && result.data?.data !== undefined) {
            setVehicles([
                ...vehicles,
                {
                    ...result.data.data,
                    ownerType: "user",
                    eta: StardustDateParser.deserialize(result.data.data.eta),
                    etd: StardustDateParser.deserialize(result.data.data.etd),
                },
            ]);

            return true;
        }

        return false;
    };

    const sendMessage = async (params: Parking.SendPushNotification.Params): Promise<boolean> => {
        const result = await parkManager.sendPushNotification(params);

        return result.isSuccessful;
    };

    return {
        //vehicles,
        getVehiclesByOwnerType,
        updateVehicles,
        updateUserVehicleEtda,
        updateUserVehicleInfo,
        registerGuestVehicleToBuilding,
        registerUserVehicle,
        sendMessage,
    };
}
