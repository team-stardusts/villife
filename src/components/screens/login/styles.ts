import { StyleSheet } from "react-native";
import useAppTheme from "../../../hooks/internal/themes/hooks";
import useSystemInfo from "../../../hooks/internal/systeminfo/hooks";

const Theme = useAppTheme();

console.log(Theme.colors)

const GreetingSection = StyleSheet.create({
    box: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: "50%"
    },
    textWrapper: {
        
    }
})

const LoginScreenStyles: LoginScreenStylesType = {
    GreetingSection,
}

export type LoginScreenStylesType = {
    GreetingSection: ReturnType<typeof StyleSheet.create> 
}

export default LoginScreenStyles;