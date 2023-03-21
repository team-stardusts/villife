import { useEffect } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { isLoggedInState, loginDataState } from "../../../states/atoms/login";
import { IsLogggedInType, LoginDataStateType } from "../../../states/atoms/login/types";
import useVillifeStorage from "../../../storage/hooks";
import { LoginDataType } from "../../../storage/tables/login/types";
import ALoginManager from "../absc";

class VillifeLoginManager extends ALoginManager {
    public async login(): Promise<any> {

    }
    public async logout(): Promise<any> {
        
    }
    public async refresh(): Promise<any> {
        
    }
    public async join(): Promise<any> {
        
    }
}

export default VillifeLoginManager;