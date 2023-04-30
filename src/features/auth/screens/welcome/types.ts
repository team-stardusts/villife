import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { StyleSheet } from "react-native/types";
import { VillifeStackParamList } from "../../../common/router/types";

type WelcomScreenProps = NativeStackScreenProps<VillifeStackParamList, "welcome">;

export default WelcomScreenProps;

export type WelcomScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    UserTypeIconSection: ReturnType<typeof StyleSheet.create>;
    InputsSection: ReturnType<typeof StyleSheet.create>;
    BlankSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};
