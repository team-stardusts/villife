import { atom } from "recoil";
import { Villife } from "../../../../../../libs/villife-client";

const roomsState = atom<Villife.Contract.Room[]>({
    key: "contract_room_state",
    default: [],
});

export default roomsState;
