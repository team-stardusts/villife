import { PagealbeParams, PaginationMeta } from "./types";

namespace KakaoLocal {
    export type SearchAddress = {
        documents: Document[];
        meta: PaginationMeta;
    }

    export interface SearchAddressParams extends PagealbeParams {
        query: string;
        analyze_type?: "similar" | "exact";
    }

    export interface Document extends Coordinate {
        address_type: string;
        address?: Address;
        road_address?: RoadAddress;
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

export default KakaoLocal;