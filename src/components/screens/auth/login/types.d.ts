import { StyleSheet } from "react-native/types";
import { LoginDataType } from "../../../hooks/internal/stardusts_storage/tables/types";

declare namespace LoginScreenTypes {
    type LoginScreenStylesType = {
        Page: ReturnType<typeof StyleSheet.create>;
        GreetingSection: ReturnType<typeof StyleSheet.create>;
        LoginInputSection: ReturnType<typeof StyleSheet.create>;
        JoinLinkSection: ReturnType<typeof StyleSheet.create>;
        //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
    };
    interface LoginScreenProps {
        //onLogin?(): LoginDataType;
        navigation: any;
    }
}

export default LoginScreenTypes;