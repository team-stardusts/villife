import { useEffect, useState } from "react";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { Building } from "../../../../../libs/rest_apis/villife/building/types";
import AServiceProvider from "../../../hooks/service/provider/absc";
import useUserInformation from "../../../hooks/service/user_info";
import { BuildingInfoBase, BuildingInfoGettable, ExtendedBuildingInfo } from "./types";

export default function useBuildingInfo(): BuildingInfoBase | null {
    const user = useUserInformation();
    const [buildingID, setBuildingID] = useState<number | undefined>(undefined);
    const [buildingInfo, setBuildingInfo] = useState<ExtendedBuildingInfo | null>(null);

    const service: BuildingInfoGettable = new BuildingInfoProvider();

    useEffect(() => {
        if (user === null) {
            setBuildingID(undefined);

            return;
        }

        if (user.isRenter) {
            setBuildingID(user.buildingID);
        } else {
            setBuildingID(user.adminInfomation?.selectedBuilding.id);
        }
    }, [user?.adminInfomation?.selectedBuilding]);

    useEffect(() => {
        setBuildingInfoData();
    }, [buildingID]);

    const setBuildingInfoData = async () => {
        if (buildingID === undefined) {
            setBuildingInfo(null);
            return;
        }

        const _buildingInfo = await service.getBuildingInfo(buildingID);

        if (_buildingInfo === null) {
            setBuildingInfo(null);
            return;
        }

        let roomInfos: Array<number | null> = [];

        if (user?.isAdmin) {
            roomInfos = await service.getBuildingRoomsInfo(buildingID);
        }

        setBuildingInfo({
            ..._buildingInfo,
            rooms: roomInfos,
        });
    };

    return buildingInfo === null ? buildingInfo : new BuildingInfo(user?.isAdmin, buildingInfo);
}

class BuildingInfo implements BuildingInfoBase {
    private _rawdata: ExtendedBuildingInfo;
    private _isAdmin: boolean;

    constructor(isAdmin: boolean | undefined, buildingInfo: ExtendedBuildingInfo) {
        this._isAdmin = isAdmin === undefined ? false : isAdmin;
        this._rawdata = buildingInfo;
    }

    get isAdmin(): boolean {
        return this._isAdmin;
    }

    get address(): string {
        return this._rawdata.road_addr;
    }

    get bankAccounts(): Building.BuildingBankAccountInfo[] {
        return this._rawdata.bank_accounts;
    }

    get mfDueDate(): number {
        return this._rawdata.mf_due_date;
    }

    get mfNotiDate(): number {
        return this._rawdata.mf_noti_date;
    }

    get name(): string {
        return this._rawdata.building_name;
    }

    get ownerName(): string {
        return this._rawdata.owner_name;
    }

    get rooms(): Array<number | null> {
        return this._rawdata.rooms;
    }
}

class BuildingInfoProvider extends AServiceProvider implements BuildingInfoGettable {
    private _api = VillifeServer.getBuildingManager();
    protected errorTag: string = "[BUILDING_INFO_PROVIDER]";

    public async getBuildingInfo(buildingID: number): Promise<Building.BuildingInfo | null> {
        const result = await this._api.getBuildingInfo({ buildingID });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "Failed to get building information.");

            return null;
        }

        return result.data.data;
    }

    public async getBuildingRoomsInfo(buildingID: number): Promise<Array<number | null>> {
        const result = await this._api.getRoomInfosInBuilding({ building_id: buildingID });

        if (!result.isSuccessful || result.data?.data === undefined) {
            this.printWhyFailed(result.data, "Failed to get building rooms informatino.");

            return [];
        }

        const rooms: Array<number | null> = [];

        for (let roominfo of result.data.data) {
            let floor = roominfo.floor + 1; // 반지하 추가

            if (rooms.length < floor) {
                const delta = floor - rooms.length;

                for (let i = 0; i < delta; i++) {
                    //console.log(i);
                    rooms.push(null);
                }
            }

            if (typeof rooms[roominfo.floor] === "number") {
                rooms[roominfo.floor] = (rooms[roominfo.floor] as number) + 1;
            } else {
                rooms[roominfo.floor] = 1;
            }
        }

        return rooms;
    }
}
