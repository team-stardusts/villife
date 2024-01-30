import { useRecoilState, useRecoilValue } from "recoil";
import { adminInfoState } from "../../../states/atoms/user/admin_only";
import VillifeNativeClient from "../../../../../../libs/villife-native-client";

import { Storage } from "../../../../model/storage/type";
import ViewModelStorage from "../../../../model/storage";
import { loginDataState } from "../../../states/atoms/login";
import { Villife } from "@team-stardusts/villife-client";

export default function useAdminInfoService() {
    const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);
    const loginData = useRecoilValue(loginDataState);

    class AdminInfoService {
        private static storage: Storage<number> = ViewModelStorage.getInstance() as Storage<number>;
        private static storageKey: string = loginData?.name + "id-selected-building-id";
        private static readonly api = new VillifeNativeClient().user;

        public static async initializeAdminInformation(): Promise<void> {
            const _admininfo = await this.fetchBuildingsManagedByAdmin().catch(() => {
                console.error("[ADMIN_INFO_SERVICE]", "Can not get admin info.");
                return null;
            });

            const selectedBuildingId = await this.storage.getItem(this.storageKey);
            let selectedBuilding = null;

            if (_admininfo !== null) {
                if (_admininfo.length === 0) {
                    // 첫 로그인 한 관리자를 식별하기 위해 undefined 추가
                    setAdminInfo(undefined);
                }

                if (selectedBuildingId !== null) {
                    selectedBuilding = _admininfo.find((d) => d.id === selectedBuildingId);
                }

                if (selectedBuilding === undefined) {
                    await this.storage.setItem(this.storageKey, _admininfo[0].id);
                }

                // 초기화 시 Managed buildings 중 첫 번째 Building으로 선택
                setAdminInfo({
                    selectedBuilding: selectedBuilding ?? _admininfo[0],
                    managedBuildings: _admininfo,
                });
            }
        }

        public static changeSelectedBulding(buildingId: number) {
            if (adminInfo) {
                const selectedBuilding = adminInfo.managedBuildings.find((b) => b.id === buildingId);

                if (selectedBuilding === undefined) {
                    throw new Error(`The selected building ID ${buildingId} is not subject to administration.`);
                }

                setAdminInfo({ ...adminInfo, selectedBuilding: selectedBuilding });
                this.storage.setItem(this.storageKey, selectedBuilding.id);
            }
        }

        private static async fetchBuildingsManagedByAdmin(): Promise<Villife.User.SimpleBuildingInfo[]> {
            return this.api.getManagedBuildingByAdmin();
        }
    }

    return AdminInfoService;
}
