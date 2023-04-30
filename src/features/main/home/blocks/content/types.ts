import { VillifeStackParamList } from "../../../../common/router/types";

export type HomeScreenContentProps = {
    navigation: {
        title: string;
        to: keyof VillifeStackParamList;
        params?: VillifeStackParamList[HomeScreenContentProps["navigation"]["to"]];
    };

    children: React.ReactNode;
} & ImplementedContentProps;

export type ImplementedContentProps = {
    backgroundColor: string;
};
