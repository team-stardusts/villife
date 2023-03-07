import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import { UseUniversialButtonStylesProps, UseUniversialButtonStylesPropsReturnType } from "./types";


export default function useUniversialButtonStyles(
    props: UseUniversialButtonStylesProps): UseUniversialButtonStylesPropsReturnType {
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();
    
    return StyleSheet.create({
        view: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: props.borderRadius ?? SystemInfo.window.width * 0.02,
            flex: 1,
            width: "100%",
            borderColor: props.disabled 
                        ? props.disabledButtonColor ?? Theme.colors.colorFamily.lightblue
                        : props.isPressing 
                            ? props.pressedButtonColor ?? Theme.colors.colorFamily.lightblue
                            : props.buttonColor  ?? Theme.colors.colorFamily.blue,
            backgroundColor: props.disabled 
                        ? props.disabledButtonColor ?? Theme.colors.colorFamily.lightblue
                        : props.isPressing 
                            ? props.pressedButtonColor ?? Theme.colors.colorFamily.lightblue
                            : props.buttonColor  ?? Theme.colors.colorFamily.blue,
            borderWidth: props.isPressing
                        ? SystemInfo.window.width * 0.004
                        : SystemInfo.window.width * 0.002,
        },
        text: {
            color: Theme.colors.colorFamily.white,
            fontSize: SystemInfo.window.width * 0.04,
            fontWeight: "700",
        }
    });
}