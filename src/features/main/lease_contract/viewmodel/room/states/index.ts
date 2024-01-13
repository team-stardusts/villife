import { Villife } from "@team-stardusts/villife-client";
import { atom } from "recoil";

export type RoomInfo = {
    contractInfo: Villife.Contract.Contract & {
        expirationDate: Date;
        startDate: Date;
    };
    contractState: Villife.Contract.ContractStatus;
    floor: number;
    residentName: string;
    residentPhoneNumber: string;
    roomNumber: number;
    roomId: number;
    roomState: Villife.Contract.RoomState;
};

const roomsState = atom<RoomInfo[]>({
    key: "contract_room_state",
    default: [],
});

export default roomsState;
