import SystemInfo from ".";
import { UseSystemInfoReturnType } from "./types";


export default function useSystemInfo(): UseSystemInfoReturnType {
    return new SystemInfo;
}