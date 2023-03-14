import { AxiosRequestConfig } from "axios";
import { Requestable, ResponesType } from "../types";

export default interface IKakoRestAPI extends Requestable {
    searchAddress(address: string): ResponesType<KakaoRespones.Local.SearchAddressReturns>;
}

export namespace KakaoRespones {
    export namespace Local {
        export type SearchAddressReturns = {
            documents: Document[];
            meta: KakaoRespones.PaginationMeta;
        }
        export interface Document extends Coordinate {
            address_type: string;
            address: Address;
            road_address: RoadAddress;
        }

        interface Region {
            region_1depth_name: string;
            region_2depth_name: string;
            region_3depth_name: string;
        }

        interface Coordinate {
            address_name: string;
            x: string;
            y: string;
        }

        interface Address extends Coordinate, Region {
            region_3depth_h_name: string;
            h_code: string;
            b_code: string;
            mountain_yn: string;
            main_address_no: string;
            sub_address_no: string;
        }

        interface RoadAddress extends Coordinate, Region {
            road_name: string;
            underground_yn: string;
            main_building_no: string;
            sub_building_no: string;
            building_name: string;
            zone_no: string;
        }
    }

    export interface PaginationMeta {
        total_count: number;
        pageable_count: number;
        is_end: number;
    }

    export interface FailureData {
        errorType: string | undefined;
        message: string | undefined;
    }
}