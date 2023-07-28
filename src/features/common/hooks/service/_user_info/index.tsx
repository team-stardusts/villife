import { useRecoilState, useRecoilValue } from "recoil";
import { loginDataState } from "../../states/atoms/login";
import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import { IUserInfoProvider, UseUserInfoReturns } from "./types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";
import { adminInfoState } from "../../states/atoms/user/admin_only";
import { IVillifeUserInfoRestClient, SimpleBuildingInfo } from "../../../../../libs/rest_apis/villife/user_info/types";
import VillifeServer from "../../../../../libs/rest_apis/villife";
import { Response } from "../../../../../libs/rest_apis/types";

export default function useUserBasicInfo(): UseUserInfoReturns {
    const loginData = useRecoilValue<LoginDataType | null>(loginDataState);
    const [adminInfo, setAdminInfo] = useRecoilState<AdminInformation | null>(adminInfoState);

    if (loginData === null) return null;
    if (loginData.building_id === 99999999) return null;

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

    class UserInfoProvider implements IUserInfoProvider {
        public readonly rawdata: LoginDataType;
        private readonly adminInfo: AdminInformation | null;

        constructor(loginData: LoginDataType, adminInfo: AdminInformation | null) {
            this.rawdata = loginData;
            this.adminInfo = adminInfo;

            /* if (this.isAdmin && this.adminInfo === null) {
                AdminInfoService.initializeAdminInformation();
            } */
        }

        get host(): LoginDataType["host"] {
            return this.rawdata.host;
        }

        get name(): LoginDataType["name"] {
            return this.rawdata.name;
        }

        get authority(): LoginDataType["authority"] {
            return this.rawdata.authority;
        }

        get roomID(): LoginDataType["room_id"] {
            return this.rawdata.room_id;
        }

        get buildingID(): LoginDataType["building_id"] {
            return this.rawdata.building_id;
        }

        get isRenter(): boolean {
            return this.authority === VILLIFE_AUTHORITY.RENTER;
        }

        get isOwner(): boolean {
            return this.authority === VILLIFE_AUTHORITY.OWNER;
        }

        get isAdmin(): boolean {
            return this.authority === VILLIFE_AUTHORITY.ADMIN;
        }

        get isSiteAdmin(): boolean {
            return this.authority === VILLIFE_AUTHORITY.SITE_ADMIN;
        }

        get adminInfomation(): AdminInformation | null {
            return this.adminInfo;
        }

        public changeAdminSelectedBuilding(building: SimpleBuildingInfo): void {
            return AdminInfoService.changeSelectedBulding(building);
        }
    }

    return new UserInfoProvider(loginData, adminInfo);
}
