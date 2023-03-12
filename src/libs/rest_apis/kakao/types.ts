import { AxiosRequestConfig } from "axios";
import { Requestable } from "../types";

export default interface IKakoRestAPI extends Requestable {
    searchAddress(address: string): Promise<any>;
}
