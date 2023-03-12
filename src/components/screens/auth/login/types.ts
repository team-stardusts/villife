import { StyleSheet } from "react-native/types";
import { LoginDataType } from "../../../../hooks/storage/tables/types";

declare namespace LoginScreenTypes {
    type LoginScreenStylesType = {
        Screen: ReturnType<typeof StyleSheet.create>;
        LoginInputSection: ReturnType<typeof StyleSheet.create>;
        JoinLinkSection: ReturnType<typeof StyleSheet.create>;
        //GreetingSection: ReturnType<typeof StyleSheet.create>;
        //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
    };
    interface LoginScreenProps {
        //onLogin?(): LoginDataType;
        navigation: any;
    }
}

export default LoginScreenTypes;