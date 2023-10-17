import { useRecoilValue } from "recoil";
import { loginDataState } from "../../states/atoms/login";
import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import { UserInfo } from "./types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";
import { adminInfoState } from "../../states/atoms/user/admin_only";
import { SimpleBuildingInfo } from "../../../../../libs/rest_apis/villife/user_info/types";
import useAdminInfoService from "./service";
import { LOGIN_BUILDING_ID_TEMP } from "../../../../auth/services/authentication";

export default function useUserInformation(): UserInfo | null {
    const adminService = useAdminInfoService();
    const loginData = useRecoilValue<LoginDataType | null>(loginDataState);
    const adminInfo = useRecoilValue<AdminInformation | null>(adminInfoState);

    if (loginData === null) return null;
    if (loginData.building_id === LOGIN_BUILDING_ID_TEMP) return null;

    class UserInfoProvider implements UserInfo {
        public readonly rawdata: LoginDataType;
        private readonly adminInfo: AdminInformation | null;

        public constructor(loginData: LoginDataType, adminInfo: AdminInformation | null) {
            this.rawdata = loginData;
            this.adminInfo = adminInfo;
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

        get roomNumber(): LoginDataType["room_number"] {
            return this.rawdata.room_number;
        }

        get buildingID(): LoginDataType["building_id"] {
            return this.rawdata.building_id;
        }

        get buildingRoadAddress(): LoginDataType["building_road_addr"] {
            return this.rawdata.building_road_addr;
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

        public setResidence(buildingID: number, roomID: number) {}

        public changeAdminSelectedBuilding(building: SimpleBuildingInfo): void {
            return adminService.changeSelectedBulding(building);
        }
    }

    return new UserInfoProvider(loginData, adminInfo);
}
