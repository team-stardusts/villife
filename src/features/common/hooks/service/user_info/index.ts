import { useRecoilValue } from "recoil";
import { loginDataState } from "../../states/atoms/login";
import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import { UserInfo } from "./types";
import { AdminInformation } from "../../states/atoms/user/admin_only/type";
import { adminInfoState } from "../../states/atoms/user/admin_only";
import useAdminInfoService from "./service";
import { LOGIN_BUILDING_ID_TEMP } from "../../../../auth/services/authentication";
import { Villife } from "@team-stardusts/villife-client";

export default function useUserInformation(): UserInfo | null {
    const adminService = useAdminInfoService();
    const loginData = useRecoilValue<LoginDataType | null>(loginDataState);
    const adminInfo = useRecoilValue<AdminInformation | null | undefined>(adminInfoState);

    //
    if (loginData === null || loginData === undefined) return null;
    if (loginData.buildingId === LOGIN_BUILDING_ID_TEMP) return null;

    class UserInfoProvider implements UserInfo {
        public readonly rawdata: LoginDataType;
        private readonly adminInfo: AdminInformation | null | undefined;

        public constructor(loginData: LoginDataType, adminInfo: AdminInformation | null | undefined) {
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

        get roomID(): LoginDataType["roomId"] {
            return this.rawdata.roomId;
        }

        get roomNumber(): LoginDataType["roomNumber"] {
            return this.rawdata.roomNumber;
        }

        get buildingID(): LoginDataType["buildingId"] {
            return this.rawdata.buildingId;
        }

        get buildingRoadAddress(): LoginDataType["buildingRoadAddr"] {
            return this.rawdata.buildingRoadAddr;
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

        get adminInfomation(): AdminInformation | null | undefined {
            return this.adminInfo;
        }

        public setResidence(buildingID: number, roomID: number) {}

        public changeAdminSelectedBuilding(buildingId: number): void {
            try {
                adminService.changeSelectedBulding(buildingId);
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.name, e.message);
                } else {
                    console.error(
                        "Unexcepted error occurrence while 'changeAdminSelectedBuilding'.\nIt is presumed that the building ID is wrong."
                    );
                }
            }
        }
    }
    
    return new UserInfoProvider(loginData, adminInfo);
}
