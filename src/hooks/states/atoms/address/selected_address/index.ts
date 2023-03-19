import { atom } from "recoil"
import SelectedAddressType from "./types"

const selectedAddress = atom<SelectedAddressType>({
    key: "selectedAddress",
    default: null,
})

export default selectedAddress;