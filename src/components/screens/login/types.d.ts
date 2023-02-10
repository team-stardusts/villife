import { StyleSheet } from "react-native/types";

declare namespace LoginScreenTypes {
    type LoginScreenStylesType = {
        Page: ReturnType<typeof StyleSheet.create>;
        GreetingSection: ReturnType<typeof StyleSheet.create>;
        LoginInputSection: ReturnType<typeof StyleSheet.create>;
        JoinLinkSection: ReturnType<typeof StyleSheet.create>;
        SocialLoginSection: ReturnType<typeof StyleSheet.create>;
    };
}

export default LoginScreenTypes;