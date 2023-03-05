import type { StyleSheet } from "react-native/types";

export type CreateAccountScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    TitleSection: ReturnType<typeof StyleSheet.create>;
    ContentsSection: ReturnType<typeof StyleSheet.create>;
    AccountInputSection: ReturnType<typeof StyleSheet.create>;
    BlankSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};