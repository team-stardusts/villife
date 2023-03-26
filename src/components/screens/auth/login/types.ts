import { StyleSheet } from "react-native/types";
import { LoginDataType } from "../../../../hooks/storage/tables/login/types";


export type LoginScreenStylesType = {
    Screen: ReturnType<typeof StyleSheet.create>;
    LoginInputSection: ReturnType<typeof StyleSheet.create>;
    JoinLinkSection: ReturnType<typeof StyleSheet.create>;
    //GreetingSection: ReturnType<typeof StyleSheet.create>;
    //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};
export default interface LoginScreenProps {
    //onLogin?(): LoginDataType;
    navigation: any;
}