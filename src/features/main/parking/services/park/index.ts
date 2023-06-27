import VillifeServer from "../../../../../libs/rest_apis/villife";
import IVillifeParkingManager, { Parking } from "../../../../../libs/rest_apis/villife/parking/types";
import { GuestVehicle, MyVehicleEtdaUpdateServiceParams, ParkServiceReturns, TenantVehicle, Vehicle } from "./types";
import { useRecoilState } from "recoil";
import { VehiclesStateType } from "../state/types";
import { vehiclesState } from "../state";
import { useEffect } from "react";
import StardustDateParser from "../../../../../libs/date_parser";
import { EtdaTime } from "../../blocks/etad_time_picker/types";

export default function useParkService(): ParkServiceReturns {
    const [vehicles, setVehicles] = useRecoilState<VehiclesStateType>(vehiclesState);
    const parkManager: IVillifeParkingManager = VillifeServer.getParkingManager();

    useEffect(() => {
        bootstrap();
    }, []);

    const bootstrap = async () => {
        setVehicles({
            ...vehicles,
            myVehicles: await getVehicles("own"),
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

        if (result.data?.data !== undefined) {
            //const dataArray: Parking.TenantVehicle[] | Parking.GuestVehicle[] = result.data.data;
            const dataArray: Vehicle[] = [];

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
                myVehicles: await getVehicles("own"),
            });

        return isSuccessful;
    };

    const updateMyVehicleInfo = async (params: Parking.VehicleInfopdateParams): Promise<boolean> => {
        const isSuccessful: boolean = (await parkManager.updateUserVehicleInfo(params)).isSuccessful;

        isSuccessful &&
            setVehicles({
                ...vehicles,
                myVehicles: await getVehicles("own"),
            });

        return isSuccessful;
    };

    return {
        vehicles,
        updateMyVehicleEtda,
        updateMyVehicleInfo,
    };
}
