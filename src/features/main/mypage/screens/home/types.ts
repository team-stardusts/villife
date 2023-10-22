import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../../common/router/types";
import type useMyPageHomeScreenStyles from "./styles";
import { ColorValue } from "react-native";

type MyPageHomeScreenProps = NativeStackScreenProps<VillifeStackParamList, "my_page">;

export default MyPageHomeScreenProps;

export type MyPanelProps = {
    styles: ReturnType<typeof useMyPageHomeScreenStyles>["mypanel"];
};

export type InfoBoxProps = {
    styles: ReturnType<typeof useMyPageHomeScreenStyles>["mypanel"];
    name: string;
    infos: (string | undefined)[];
};

export type ScrollNavProps = {
    styles: ReturnType<typeof useMyPageHomeScreenStyles>["scrollNav"];
};

export type NavButtonProps = {
    styles: ReturnType<typeof useMyPageHomeScreenStyles>["scrollNav"];
    text: string;
    color?: ColorValue;
    onPress(text: string): void;
};
