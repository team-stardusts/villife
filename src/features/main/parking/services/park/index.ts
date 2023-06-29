import VillifeServer from "../../../../../libs/rest_apis/villife";
import IVillifeParkingManager, { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { GuestVehicle, MyVehicleEtdaUpdateServiceParams, ParkServiceReturns, TenantVehicle, Vehicle } from "./types";
import { useRecoilState } from "recoil";
import { VehiclesStateType } from "../state/types";
import { vehiclesState } from "../state";
import { useEffect } from "react";
import StardustDateParser from "../../../../../libs/date_parser";

export default function useParkService(): ParkServiceReturns {
    const [vehicles, setVehicles] = useRecoilState<VehiclesStateType>(vehiclesState);
    const parkManager: IVillifeParkingManager = VillifeServer.getParkingManager();

    useEffect(() => {
        bootstrap();
    }, []);

    const bootstrap = async () => {
        setVehicles({
            ...vehicles,
            userVehicles: await getVehicles("own"),
            vehicles: await getVehicles("tenant"),
            guestVehicles: (await getVehicles("guest")) as GuestVehicle[],
        });
    };

    const getVehicles = async (type: "own" | "tenant" | "guest"): Promise<TenantVehicle[] | GuestVehicle[]> => {
        let result;
        // [TO-DO] Building ID를 전달 받아서 넣도록 변경
        switch (type) {
            case "own":
                result = await parkManager.getVehicles();
                break;

            case "tenant":
                result = await parkManager.getVehicles(0);
                break;

            default:
                result = await parkManager.getGuestVehiclesOfBuilding(0);
                break;
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

    const updateMyVehicleEtda = async (params: MyVehicleEtdaUpdateServiceParams): Promise<boolean> => {
        const _params = {
            vehicleID: params.vehicleID,
            etd: StardustDateParser.serialize(new Date(`9999-12-31T${params.etda.etd.hour}:${params.etda.etd.minute}`)),
            eta: StardustDateParser.serialize(new Date(`9999-12-31T${params.etda.eta.hour}:${params.etda.eta.minute}`)),
        };

        const isSuccessful: boolean = (await parkManager.updateUserVehicleEtda(_params)).isSuccessful;

        isSuccessful &&
            setVehicles({
                ...vehicles,
                userVehicles: await getVehicles("own"),
            });

        return isSuccessful;
    };

    const updateMyVehicleInfo = async (params: Parking.VehicleInfopdateParams): Promise<boolean> => {
        const isSuccessful: boolean = (await parkManager.updateUserVehicleInfo(params)).isSuccessful;

        isSuccessful &&
            setVehicles({
                ...vehicles,
                userVehicles: await getVehicles("own"),
            });

        return isSuccessful;
    };

    const registerGuestVehicleToBuilding = async (
        params: Parking.RegisterGuestVehicleToBuildingParams
    ): Promise<boolean> => {
        const result = await parkManager.registerGuestVehicleToBuilding(params);
        console.log(result.data?.data);
        if (result.isSuccessful && result.data?.data !== undefined) {
            const updatedGuestVehicles = [
                ...vehicles.guestVehicles,
                {
                    ...result.data.data,
                    eta: StardustDateParser.deserialize(result.data.data.eta),
                    etd: StardustDateParser.deserialize(result.data.data.etd),
                },
            ];

            setVehicles({
                ...vehicles,
                guestVehicles: updatedGuestVehicles,
            });

            return true;
        }

        return false;
    };

    return {
        vehicles,
        updateMyVehicleEtda,
        updateMyVehicleInfo,
        registerGuestVehicleToBuilding,
    };
}
