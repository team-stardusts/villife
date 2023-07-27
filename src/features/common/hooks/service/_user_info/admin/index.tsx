import { useRecoilState, useRecoilValue } from "recoil";
import { AdminInformation } from "../../../states/atoms/user/admin_only/type";
import { adminInfoState } from "../../../states/atoms/user/admin_only";
import useUserBasicInfo from "../basic";
import { IAdminInfoProvider, IUserInfoProvider, UseAdminInfoReturns } from "../types";
import {
    IVillifeUserInfoRestClient,
    SimpleBuildingInfo,
} from "../../../../../../libs/rest_apis/villife/user_info/types";
import { useEffect } from "react";
import VillifeServer from "../../../../../../libs/rest_apis/villife";
import { Response } from "../../../../../../libs/rest_apis/types";

export default function useAdminInfo(): UseAdminInfoReturns {
    const userBasicInfo: IUserInfoProvider | null = useUserBasicInfo();
    const [adminInfo, setAdminInfo] = useRecoilState<AdminInformation | null>(adminInfoState);

    if (adminInfo === null) return null;
    if (userBasicInfo === null || !userBasicInfo.isAdmin) return null;

    class AdminInfoService {
        private static readonly api: IVillifeUserInfoRestClient = VillifeServer.getUserInfoRestClient();

        public static async initializeAdminInformation(): Promise<void> {
            const _admininfo = await this.fetchBuildingsManagedByAdmin();

            if (_admininfo.isSuccessful && _admininfo.data?.data !== undefined) {
                // 초기화 시 Managed buildings 중 첫 번째 Building으로 선택
                setAdminInfo({
                    ...adminInfo,
                    selectedBuilding: _admininfo.data.data[0],
                    managedBuildings: _admininfo.data.data,
                });
            } else {
                console.error("[ADMIN_INFO_SERVICE]", "Can not get admin info.");
            }
        }

        public static async changeSelectedBulding(building: SimpleBuildingInfo) {
            if (adminInfo !== null) {
                setAdminInfo({ ...adminInfo, selectedBuilding: building });
            }
        }

        private static async fetchBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>> {
            return await this.api.getBuildingsManagedByAdmin();
        }
    }

    class AdminInfoProvider implements IAdminInfoProvider {
        public readonly rawdata: AdminInformation;

        constructor(adminInfo: AdminInformation) {
            this.rawdata = adminInfo;
        }

        get selectedBuilding(): AdminInformation["selectedBuilding"] {
            return this.rawdata.selectedBuilding;
        }

        set selectedBuilding(building: SimpleBuildingInfo) {
            AdminInfoService.changeSelectedBulding(building);
        }

        get managedBuildings(): AdminInformation["managedBuildings"] {
            return this.rawdata.managedBuildings;
        }
    }

    return new AdminInfoProvider(adminInfo);
}
