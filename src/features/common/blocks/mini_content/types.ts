import { VillifeStackParamList } from "../../router/types";

export type MiniContentProps = {
    title: string;
    navigation?: {
        to: keyof VillifeStackParamList;
        params?: any; //VillifeStackParamList[MiniContentProps["navigation"]["to"]];
    };
    children?: React.ReactNode;
};
