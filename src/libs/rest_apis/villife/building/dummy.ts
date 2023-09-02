import { Building } from "./types";

export default function generateDummyRoomInfoData(): Building.RoomInfo[] {
    const tenants: Building.RoomInfo[] = [];
    const contractStatuses: Building.ContractStatus[] = ["expired", "imminent-expiration", "absense", "normal"];
    const roomStates: Building.RoomState[] = ["empty", "signed", "unsigned"];
    const rentTypes: Building.RentType[] = ["lump-sum-deposit", "partial-lump-sum-deposit", "monthly-rent"];

    for (let floor = 1; floor <= 5; floor++) {
        for (let roomNumber = 1; roomNumber <= 5; roomNumber++) {
            const roomNumberString = `${floor}${roomNumber.toString().padStart(2, "0")}`;
            const roomInfo: Building.RoomInfo = {
                room_number: parseInt(roomNumberString),
                room_state: roomStates[Math.floor(Math.random() * roomStates.length)],
                floor,
                contract_state: contractStatuses[Math.floor(Math.random() * contractStatuses.length)],
                contract_info: {
                    contract_id: 1,
                    rent_type: rentTypes[Math.floor(Math.random() * rentTypes.length)],
                    deposit: Math.floor(Math.random() * 1000000) + 100000,
                    monthly_rent: Math.floor(Math.random() * 100000) + 50000,
                    management_fee: Math.floor(Math.random() * 10000) + 5000,
                    start_date: (Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30 * 6)) / 1000,
                    expiration_date: (Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3)) / 1000,
                    //created_at: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3),
                    //updated_at: Date.now(),
                },
                room_id: 1,
                //resident_id: `${Math.floor(Math.random() * 1000000000)}`,
                resident_name: `dummy-name-${roomNumberString}`,
                resident_phone_number: `010-1234-${roomNumberString.slice(-2)}`,
            };
            tenants.push(roomInfo);
        }
    }
    return tenants;
}
