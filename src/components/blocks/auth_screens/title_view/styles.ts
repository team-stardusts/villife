import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import { UseAuthScreenTitleViewStylesType } from "./types";


export default function useAuthScreenTtitleViewStyles(): UseAuthScreenTitleViewStylesType {
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();

    return StyleSheet.create({
        topLevelBox: {
            flex: 2,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
        },
        textWrapper: {
            textAlign: "left",
            paddingTop: SystemInfo.window.width * 0.04,
        },
        title: {
            color: Theme.colors.colorFamily.blue, 
            fontWeight: "bold",
            fontSize: SystemInfo.window.width * 0.07,
        },
        subtitle: {
            color: Theme.colors.colorFamily.black,
            fontSize: SystemInfo.window.width * 0.03,
        }
    });
}
