import { Requestable, Respones } from "../types";
import KakaoLocal from "./types.local";

export default interface IKakoREST extends Requestable {
    searchAddress(address: string): Respones<KakaoLocal.SearchAddress>;
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