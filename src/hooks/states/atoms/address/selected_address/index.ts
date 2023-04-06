import { atom } from "recoil"
import SelectedAddressStateType from "./types"

const selectedAddressState = atom<SelectedAddressStateType>({
    key: "selectedAddressState",
    default: null,
})

export default selectedAddressState;