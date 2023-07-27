import { useRecoilValue } from "recoil";
import { loginDataState } from "../../../states/atoms/login";
import { LoginDataType } from "../../../../../../libs/storage/tables/login/types";
import { VILLIFE_AUTHORITY } from "../../../../../../libs/rest_apis/villife/absc";
import { IUserInfoProvider, UseUserBasicInfoReturns } from "../types";

export default function useUserBasicInfo(): UseUserBasicInfoReturns {
    const loginData = useRecoilValue<LoginDataType | null>(loginDataState);

    if (loginData === null) return null;
    if (loginData.building_id === 99999999) return null;

    class UserBasicInfoProvider implements IUserInfoProvider {
        public readonly rawdata: LoginDataType;

        constructor(loginData: LoginDataType) {
            this.rawdata = loginData;
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

        /* get accessToken(): LoginDataType["accessToken"] {
            return this._rawdata.accessToken;
        }

        get refreshToken(): LoginDataType["refreshToken"] {
            return this._rawdata.refreshToken;
        } */
    }

    return new UserBasicInfoProvider(loginData);
}
