import Kakao from "../../../libs/rest_apis/kakao";
import KakaoLocal from "../../../libs/rest_apis/kakao/types.local";
import { Respones, Responsable } from "../../../libs/rest_apis/types";
import Villife from "../../../libs/rest_apis/villife";
import IBuildingManager from "./types";

class BuildingManager implements IBuildingManager{
    readonly villife: Villife = new Villife();
    readonly kakao: Kakao = new Kakao();
    
    public async searchByAddress(address: string): Promise<KakaoLocal.SearchAddress | null>{
        const result = await this.kakao.searchAddress({query: address});

        if (result.isSuccessful) {
            return result.data;
        }
        else {
            return null;
        }
    }
}

export default BuildingManager;