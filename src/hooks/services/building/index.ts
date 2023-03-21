import KakaoServer from "../../../libs/rest_apis/kakao";
import KakaoLocal from "../../../libs/rest_apis/kakao/types.local";
import { Response, Responsable } from "../../../libs/rest_apis/types";
import VillifeServer from "../../../libs/rest_apis/villife";
import IBuildingManager from "./types";

class BuildingManager implements IBuildingManager{
    readonly villife: VillifeServer = new VillifeServer();
    readonly kakao: KakaoServer = new KakaoServer();
    
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