import { useRecoilState } from "recoil";
import { adminInfoState } from "../../../states/atoms/user/admin_only";
import VillifeNativeClient from "../../../../../../libs/villife-native-client";
import Villife from "../../../../../../libs/villife-client/types";

export default function useAdminInfoService() {
    const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);

    class AdminInfoService {
        private static readonly api = new VillifeNativeClient().user;

        public static async initializeAdminInformation(): Promise<void> {
            const _admininfo = await this.fetchBuildingsManagedByAdmin().catch(() => {
                console.error("[ADMIN_INFO_SERVICE]", "Can not get admin info.");
                return null;
            });

            if (_admininfo !== null) {
                // 초기화 시 Managed buildings 중 첫 번째 Building으로 선택
                setAdminInfo({
                    ...adminInfo,
                    selectedBuilding: _admininfo[0],
                    managedBuildings: _admininfo,
                });
            }
        }

        public static changeSelectedBulding(building: Villife.User.SimpleBuildingInfo) {
            if (adminInfo !== null) {
                setAdminInfo({ ...adminInfo, selectedBuilding: building });
            }
        }

        private static async fetchBuildingsManagedByAdmin(): Promise<Villife.User.SimpleBuildingInfo[]> {
            return this.api.getManagedBuildingByAdmin();
        }
    }

    return AdminInfoService;
}
