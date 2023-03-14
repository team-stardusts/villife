import Kakao from "../../../libs/rest_apis/kakao";
import KakaoLocal from "../../../libs/rest_apis/kakao/types.local";
import { Respones } from "../../../libs/rest_apis/types";
import Villife from "../../../libs/rest_apis/villife";

export default interface IBuildingManager extends Searchable, RESTUsable{

}

export interface Searchable {
    searchByAddress(address: string): Promise<KakaoLocal.SearchAddress | null>;
}

export interface RESTUsable {
    readonly villife: Villife;
    readonly kakao: Kakao;
}