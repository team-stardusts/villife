import VillifeUtility from "./utility";

namespace VillifeUser {
    export interface Client {
        getUserInfo(): Promise<User>;
        getManagedBuildingByAdmin(): Promise<SimpleBuildingInfo[]>;
    }

    export type User = {
        authority: VillifeUtility.Authority[keyof VillifeUtility.Authority];
        buildingId: number | undefined;
        buildingRoadAddr: string;
        name: string;
        roomId: number;
        roomNumber: number;
    };

    export type SimpleBuildingInfo = {
        id: number;
        owner: string;
        address: string;
        name: string;
    };
}

export default VillifeUser;
