import { useRecoilState } from "recoil";
import VillifeServer from "../../../../../../libs/rest_apis/villife";
import {
    IVillifeUserInfoRestClient,
    SimpleBuildingInfo,
} from "../../../../../../libs/rest_apis/villife/user_info/types";
import { adminInfoState } from "../../../states/atoms/user/admin_only";
import { Response } from "../../../../../../libs/rest_apis/types";

export default function useAdminInfoService() {
    const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);

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

        public static changeSelectedBulding(building: SimpleBuildingInfo) {
            if (adminInfo !== null) {
                setAdminInfo({ ...adminInfo, selectedBuilding: building });
            }
        }

        private static async fetchBuildingsManagedByAdmin(): Response<Array<SimpleBuildingInfo>> {
            return await this.api.getBuildingsManagedByAdmin();
        }
    }

    return AdminInfoService;
}
