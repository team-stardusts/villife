import { useRecoilValue } from "recoil";
import { loginDataState } from "../../states/atoms/login";
import { LoginDataType } from "../../../../../libs/storage/tables/login/types";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import { IUserInfoProvider, UseUserInfoServiceReturns } from "./types";

export default function useUserInfoService_(): UseUserInfoServiceReturns {
    const loginData = useRecoilValue<LoginDataType | null>(loginDataState);

    if (loginData === null) return null;
    if (loginData.building_id === 99999999) return null;

    class UserInfoProvider implements IUserInfoProvider {
        private readonly _rawdata: LoginDataType;

        constructor(loginData: LoginDataType) {
            this._rawdata = loginData;
        }

        get rawdata(): LoginDataType {
            return this._rawdata;
        }

        get host(): LoginDataType["host"] {
            return this._rawdata.host;
        }

        get name(): LoginDataType["name"] {
            return this._rawdata.name;
        }

        get authority(): LoginDataType["authority"] {
            return this._rawdata.authority;
        }

        get roomID(): LoginDataType["room_id"] {
            return this._rawdata.room_id;
        }

        get buildingID(): LoginDataType["building_id"] {
            return this._rawdata.building_id;
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

    return new UserInfoProvider(loginData);
}
