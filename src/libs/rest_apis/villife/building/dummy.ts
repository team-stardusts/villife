import { Building } from "./types";

const getRandomRoomType = () => {
    const roomTypes: Array<Building.RoomType> = ["empty", "registered", "unregistered"];
    return roomTypes[Math.floor(Math.random() * roomTypes.length)];
};

const getRandomContractType = () => {
    const contractTypes: Array<Building.ContractType> = [
        "lump-sum-deposit",
        "partial-lump-sum-deposit",
        "monthly-rent",
    ];
    return contractTypes[Math.floor(Math.random() * contractTypes.length)];
};

export const generateTestTenantData = () => {
    const tenants = [];

    for (let floor = 1; floor <= 11; floor++) {
        for (let room = 1; room <= 5; room++) {
            const room_number = floor * 100 + room;
            tenants.push({
                room_type: getRandomRoomType(),
                contract_type: getRandomContractType(),
                room_number,
                contract_started_at: Math.floor(Math.random() * 1000000000),
                contract_ended_at: Math.floor(Math.random() * 1000000000),
            });
        }
    }

    return tenants;
};
