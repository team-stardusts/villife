import { StackParamList } from "../../../../router/types";

export type HomeScreenContentProps = {
    navigation: {
        title: string;
        to: keyof StackParamList;
        params?: StackParamList[HomeScreenContentProps["navigation"]["to"]];
    };

    children: React.ReactNode;
};
