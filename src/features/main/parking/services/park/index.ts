import VillifeServer from "../../../../../libs/rest_apis/villife";
import IVillifeParkingManager, { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import {
    GuestVehicle,
    MyVehicleEtdaUpdateServiceParams,
    ParkServiceReturns,
    RegisterUserVehicleParams,
    TenantVehicle,
    Vehicle,
} from "./types";
import { useRecoilState } from "recoil";
import { GuestVehicleStateType, TenantVehicleStateType, VehiclesStateType } from "../state/types";
import { guestVehiclesState, tenantVehiclesState, userVehiclesState, vehiclesState } from "../state";
import { useEffect } from "react";
import StardustDateParser from "../../../../../libs/date_parser";
import useUserInfoService from "../../../../common/hooks/service/user_info";

export default function useParkService(): ParkServiceReturns {
    const [userVehicles, setUserVehicles] = useRecoilState<TenantVehicleStateType>(userVehiclesState);
    const [tenantVehicles, setTenantVehicles] = useRecoilState<TenantVehicleStateType>(tenantVehiclesState);
    const [guestVehicles, setGuestVehicles] = useRecoilState<GuestVehicleStateType>(guestVehiclesState);
    const userinfo = useUserInfoService().basicInfo;
    const parkManager: IVillifeParkingManager = VillifeServer.getParkingManager();

    useEffect(() => {
        bootstrap();
    }, []);

    const bootstrap = async () => {
        if (userVehicles.length === 0) {
            getVehicles("own").then(setUserVehicles);
        }
        if (tenantVehicles.length === 0) {
            getVehicles("tenant").then(setTenantVehicles);
        }
        if (guestVehicles.length === 0) {
            getVehicles("guest").then((result) => setGuestVehicles(result as GuestVehicle[]));
        }
    };

    const getVehicles = async (type: "own" | "tenant" | "guest"): Promise<TenantVehicle[] | GuestVehicle[]> => {
        let result = null;
        // [TO-DO] Building ID를 전달 받아서 넣도록 변경
        switch (type) {
            case "own":
                result = await parkManager.getVehicles();
                break;

            case "tenant":
                result = await parkManager.getVehicles(userinfo?.building_id);
                break;

            case "guest":
                if (userinfo?.building_id === undefined) {
                    console.log("ParkingService:", "There are no building ID in user information.");
                    break;
                }

                result = await parkManager.getGuestVehiclesOfBuilding(userinfo.building_id);
                break;
        }
        if (result === null) {
            return [];
        }

        if (result.data?.data !== undefined && result.data.data.length > 0) {
            //const dataArray: Parking.TenantVehicle[] | Parking.GuestVehicle[] = result.data.data;
            const dataArray: Vehicle[] = [];

            // [TO-DO] Tenant vehicles를 받아올 시 Payload가 String으로 오는데,
            // 임시로 JSON으로 파싱해서 사용. 수정 시 삭제 필요

            if (typeof result.data.data != "object") {
                try {
                    result.data.data = JSON.parse((result.data.data as string).slice(2));
                } catch {
                    return [];
                }
            }

            for (let i = 0; i < result.data.data.length; i++) {
                dataArray.push({
                    ...result.data.data[i],
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

        isSuccessful && getVehicles("own").then(setUserVehicles);
        /* setUserVehicles({
                ...vehicles,
                userVehicles: await 
            }); */

        return isSuccessful;
    };

    const updateUserVehicleInfo = async (params: Parking.VehicleInfopdateParams): Promise<boolean> => {
        const isSuccessful: boolean = (await parkManager.updateUserVehicleInfo(params)).isSuccessful;

        isSuccessful && getVehicles("own").then(setUserVehicles);
        /* isSuccessful &&
            setVehicles({
                ...vehicles,
                userVehicles: await getVehicles("own"),
            }); */

        return isSuccessful;
    };

    const registerGuestVehicleToBuilding = async (
        params: Parking.RegisterGuestVehicleToBuildingParams
    ): Promise<boolean> => {
        const result = await parkManager.registerGuestVehicleToBuilding(params);

        if (result.isSuccessful && result.data?.data !== undefined) {
            const updatedGuestVehicles = [
                ...guestVehicles,
                {
                    ...result.data.data,
                    eta: StardustDateParser.deserialize(result.data.data.eta),
                    etd: StardustDateParser.deserialize(result.data.data.etd),
                },
            ];

            setGuestVehicles(updatedGuestVehicles);

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
            const updatedUserVehicles = [
                ...userVehicles,
                {
                    ...result.data.data,
                    eta: StardustDateParser.deserialize(result.data.data.eta),
                    etd: StardustDateParser.deserialize(result.data.data.etd),
                },
            ];

            setUserVehicles(updatedUserVehicles);

            return true;
        }

        return false;
    };

    return {
        userVehicles,
        tenantVehicles,
        guestVehicles,
        updateUserVehicleEtda,
        updateUserVehicleInfo,
        registerGuestVehicleToBuilding,
        registerUserVehicle,
    };
}
