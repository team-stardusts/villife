import { VillifeStackParamList } from "../../router/types";
import { ContentBoxProps } from "../content_box/types";

export type MiniContentProps = ContentBoxProps & {
    title: string;
    navigation?: {
        to: keyof VillifeStackParamList;
        params?: any; //VillifeStackParamList[MiniContentProps["navigation"]["to"]];
    };
};
