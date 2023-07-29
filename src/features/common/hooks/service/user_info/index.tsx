import { useRecoilValue } from "recoil";
import { loginDataState } from "../../states/atoms/login";
import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import { IUserInfoProvider, UseUserInfoReturns } from "./types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";
import { adminInfoState } from "../../states/atoms/user/admin_only";
import { SimpleBuildingInfo } from "../../../../../libs/rest_apis/villife/user_info/types";
import useAdminInfoService from "./service";

export default function useUserInformation(): UseUserInfoReturns {
    const adminService = useAdminInfoService();
    const loginData = useRecoilValue<LoginDataType | null>(loginDataState);
    const adminInfo = useRecoilValue<AdminInformation | null>(adminInfoState);

    if (loginData === null) return null;
    if (loginData.building_id === 99999999) return null;

    class UserInfoProvider implements IUserInfoProvider {
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
            return adminService.changeSelectedBulding(building);
        }
    }

    return new UserInfoProvider(loginData, adminInfo);
}
